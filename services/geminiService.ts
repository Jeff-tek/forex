import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import type { AnalysisResult } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const fileToGenerativePart = async (file: File) => {
  const base64EncodedDataPromise = new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result.split(',')[1]);
      } else {
        // Handle the case where reader.result is not a string
        resolve(''); // Or reject the promise
      }
    };
    reader.readAsDataURL(file);
  });
  return {
    inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
  };
};

const PROMPT_TEXT = `
You are a conservative, highly analytical, and risk-averse forex trading expert. Your primary goal is to provide a deterministic, consistent, and accurate analysis based on a strict set of rules. You must avoid speculation. If a high-probability setup is not present, your default and preferred recommendation is "Hold/Wait".

**Core Principles:**
- **Consistency is Key:** Your analysis must be repeatable. The same charts should yield the same analysis every time.
- **Probability-Based Recommendations:** Your recommendations should be based on the number of confirmed criteria.
    - An "A+ Setup" (high probability) requires all major criteria to be met.
    - A "B+ Setup" (moderate probability) can be considered if most, but not all, criteria are met, as detailed in the "Trade Idea Generation Logic" section.
- **Default to "Hold/Wait":** When criteria are not sufficiently met, your default and preferred recommendation is "Hold/Wait".
- **Logical Integrity:** The final checklist must be a direct and logical reflection of your detailed analysis. For example, if your 'Location Analysis' determines it's not a good location, the 'location' field in the checklist MUST be false.

Your task is to analyze two provided forex chart screenshots based on the specific trading strategy below. The user will provide two images:
1. The first image is the 4-Hour (4H) chart.
2. The second image is the 15-Minute (15M) chart.

**TRADING STRATEGY**

The analysis is based on a multi-timeframe approach using these two charts.

**1. LOCATION: Is this a good place to buy/sell? (Analyze using the first image, the 4-Hour Chart)**
- Prioritize the 4H chart (first image). It should be a 'clean' chart without EMAs.
- Focus on: Major Support/Resistance (S/R) levels, Supply & Demand Zones, and Swing Highs & Lows to determine the overall market structure.
- Analysis:
    - Identify the primary trend (Bullish, Bearish, or Range-bound) based on price action (higher highs/lows or lower highs/lows).
    - Mark Major S/R, Swing H&L zones.
    - Identify significant Supply/Demand Zones (areas where price moved rapidly away).
- Rule: The best trading LOCATIONS have multiple factors aligning at a key price level. Avoid buying directly into supply zones or selling into demand zones.

**2. MOMENTUM: Which side has control? (Analyze using the second image, the 15-Minute Chart)**
- Use the 15M chart (second image) for this. The 50 EMA (black line) indicates the short-term trend.
- Reading Momentum:
    - Bullish = Price is making higher highs & higher lows, often trading above the 50 EMA.
    - Bearish = Price is making lower highs & lower lows, often trading below the 50 EMA.
    - Neutral = Sideways movement, price crossing the 50 EMA frequently.
- Key Insight: The best setup often has momentum moving counter to your intended long-term trade direction (a pullback).
    - Example: Bullish momentum on 15M pulling back to a major 4H support level presents a BUY opportunity.

**3. ROTATION: Time entries with market cycles. (Analyze using the second image, the 15-Minute Chart)**
- Use the Stochastic Oscillator on the 15M chart (second image).
- **CRITICAL FOCUS:** Your analysis MUST focus on the most recent "leg" or movement of the stochastic lines, typically found on the far right side of the chart. This represents the most current market pressure. Do not get confused by older signals from the middle or left of the chart.
- Signals:
    - Bullish Rotation: The most recent action is the stochastic lines crossing up from below the 20 level (oversold), indicating the market is currently turning up from a low.
    - Bearish Rotation: The most recent action is the stochastic lines crossing down from above the 80 level (overbought), indicating the market is currently turning down from a high.
    - Divergence: Also look for hidden or classic bullish/bearish divergence between price and the stochastic oscillator on the most recent swings, as this is a powerful signal.
- Rule: Look for a clear, recent rotation signal that aligns with the LOCATION analysis (e.g., a fresh bullish rotation at a 4H support level).

**4. SETUP: Specific price patterns for entry. (Analyze using the second image, the 15-Minute Chart)**
- Look for classic price action patterns forming at key levels identified in the LOCATION step.
- A+ Setups: Triangle 1,2,3 Breakout (break, retest, continue), 3 Candle Reversal, Double/Triple Top/Bottoms, Head and Shoulders.
- Identification: Wait for a pattern to complete at a major level. The 10 EMA (blue) and 21 EMA (green) can help define the shape and strength of these patterns.

**5. SIGNAL: Final confirmation for entry. (Analyze using the second image, the 15-Minute Chart)**
- The primary signal is an EMA crossover on the 15M chart (second image).
- EMA Colors: 10 EMA (Blue), 21 EMA (Green), 50 EMA (Black).
- Signals:
    - Bullish Signal: The 10 EMA (blue) crosses ABOVE the 21 EMA (green). For a high-probability trade, both EMAs should be above the 50 EMA (black).
    - Bearish Signal: The 10 EMA (blue) crosses BELOW the 21 EMA (green). For a high-probability trade, both EMAs should be below the 50 EMA (black).
- Confirmation: The best entry is often on a slight pullback to the 21 EMA (green) after the initial crossover, combined with a confirming ROTATION signal.

**FINAL CHECKLIST**
- Location: Is price at a key 4H level?
- Momentum: Is the 15M chart showing a pullback (counter-momentum)?
- Rotation: Is the Stochastic confirming a turn on its most recent leg?
- Setup: Is there a clear price action pattern?
- Signal: Has an EMA cross occurred?

**Trade Idea Generation Logic:**
Your final trade idea is determined by how many checklist items are confirmed.
- **A+ Trade Idea (High Probability):** Generate a "Buy" or "Sell" idea if **Location, Momentum, Rotation, Setup, and Signal** are all confirmed.
- **B+ Trade Idea (Moderate Probability):** Recognizing that perfect "A+" setups are rare, generate a "Buy" or "Sell" idea if the **"Setup" is NOT confirmed**, but **at least 3 of the other 4 criteria (Location, Momentum, Rotation, Signal) ARE confirmed.** When generating a B+ idea, clearly state in the summary that it lacks a classic setup pattern, which may imply higher risk.
- **Hold/Wait (Low Probability):** In all other scenarios, if the conditions for an A+ or B+ trade are not met, you MUST recommend "Hold/Wait". **Crucially, if the direction is "Hold/Wait", you must use the \`summary\` field to explain what specific events need to occur to create a valid Buy or Sell setup based on the strategy.** For example: "Wait for price to retest the 4H support at 1.2500 and for a bullish EMA cross to appear on the 15M chart." For "Hold/Wait" ideas, the \`entry\`, \`stopLoss\`, and \`takeProfit\` fields MUST be set to "N/A".

**YOUR TASK**
Analyze BOTH provided chart images based on this complete strategy. Fill out all fields in the requested JSON format with your detailed analysis. Provide a final, actionable trade idea (Buy, Sell, or Hold/Wait) with entry, stop, and target suggestions based on the Trade Idea Generation Logic.
`;

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    location: {
      type: Type.OBJECT,
      properties: {
        analysis: { type: Type.STRING, description: "Detailed analysis of S/R levels, EMA confluence, Supply/Demand zones, and Swing Highs/Lows based on the 4H chart." },
        isGoodLocation: { type: Type.BOOLEAN, description: "Is this a good location to consider a trade?" },
        keyLevels: { type: Type.ARRAY, items: { type: Type.STRING }, description: "List of identified key price levels." }
      },
      required: ["analysis", "isGoodLocation", "keyLevels"]
    },
    momentum: {
      type: Type.OBJECT,
      properties: {
        analysis: { type: Type.STRING, description: "Analysis of momentum on the 15m timeframe (bullish, bearish, or neutral) using the 50 EMA." },
        tradeOpportunity: { type: Type.STRING, description: "Potential trade opportunity based on momentum (e.g., 'SELL opportunity at resistance')." }
      },
      required: ["analysis", "tradeOpportunity"]
    },
    rotation: {
      type: Type.OBJECT,
      properties: {
        analysis: { type: Type.STRING, description: "Analysis of the Stochastic Oscillator on the 15M chart, focusing on the most recent action on the right-hand side." },
        signal: { type: Type.STRING, description: "Identified rotation signal (e.g., 'Recent Bullish cross above 20', 'Bearish Divergence forming')." }
      },
      required: ["analysis", "signal"]
    },
    setup: {
      type: Type.OBJECT,
      properties: {
        analysis: { type: Type.STRING, description: "Identification of any A+ entry setups like Triangle Breakouts, 3 Candle Reversals, etc., on the 15M chart." },
        identifiedPattern: { type: Type.STRING, description: "The specific pattern identified (e.g., 'Double Bottom', 'None apparent')." }
      },
      required: ["analysis", "identifiedPattern"]
    },
    signal: {
      type: Type.OBJECT,
      properties: {
        analysis: { type: Type.STRING, description: "Analysis of 10/21/50 EMA crosses on the 15M timeframe for final confirmation." },
        isConfirmed: { type: Type.BOOLEAN, description: "Is there a confirmed EMA cross signal?" }
      },
      required: ["analysis", "isConfirmed"]
    },
    tradeIdea: {
      type: Type.OBJECT,
      properties: {
        summary: { type: Type.STRING, description: "A concise summary of the overall analysis and the final trade idea. If the direction is 'Hold/Wait', this summary MUST explain what conditions need to be met (e.g., price reaching a key level, a specific signal appearing) before a trade should be considered." },
        direction: { type: Type.STRING, description: "The suggested trade direction. Must be one of: 'Buy', 'Sell', 'Hold/Wait'." },
        entry: { type: Type.STRING, description: "Suggested entry price or condition. Should be 'N/A' for Hold/Wait." },
        stopLoss: { type: Type.STRING, description: "Suggested stop loss placement. Should be 'N/A' for Hold/Wait." },
        takeProfit: { type: Type.STRING, description: "Suggested take profit targets. Should be 'N/A' for Hold/Wait." }
      },
      required: ["summary", "direction", "entry", "stopLoss", "takeProfit"]
    },
    checklist: {
      type: Type.OBJECT,
      properties: {
        location: { type: Type.BOOLEAN },
        momentum: { type: Type.BOOLEAN },
        rotation: { type: Type.BOOLEAN },
        setup: { type: Type.BOOLEAN },
        signal: { type: Type.BOOLEAN }
      },
      required: ["location", "momentum", "rotation", "setup", "signal"]
    }
  },
  required: ["location", "momentum", "rotation", "setup", "signal", "tradeIdea", "checklist"]
};

export const analyzeChart = async (image4HFile: File, image15MFile: File): Promise<AnalysisResult> => {
  const image4HPart = await fileToGenerativePart(image4HFile);
  const image15MPart = await fileToGenerativePart(image15MFile);
  const textPart = { text: PROMPT_TEXT };
  
  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: { parts: [image4HPart, image15MPart, textPart] },
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.2,
        topP: 0.8,
        topK: 10,
        seed: 42,
      }
    });

    const responseText = response.text.trim();
    if (!responseText) {
        throw new Error("Received an empty response from the AI. The model may have refused to answer or encountered an issue.");
    }
    const result: AnalysisResult = JSON.parse(responseText);
    return result;
  } catch (e) {
    console.error("Error calling Gemini API:", e);
    if (e instanceof Error) {
        throw new Error(`API Error: ${e.message}`);
    }
    throw new Error("An unknown error occurred while communicating with the API.");
  }
};