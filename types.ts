
export interface AnalysisSection {
  analysis: string;
}

export interface LocationAnalysis extends AnalysisSection {
  isGoodLocation: boolean;
  keyLevels: string[];
}

export interface MomentumAnalysis extends AnalysisSection {
  tradeOpportunity: string;
}

export interface RotationAnalysis extends AnalysisSection {
  signal: string;
}

export interface SetupAnalysis extends AnalysisSection {
  identifiedPattern: string;
}

export interface SignalAnalysis extends AnalysisSection {
  isConfirmed: boolean;
}

export interface TradeIdea {
  summary: string;
  direction: 'Buy' | 'Sell' | 'Hold/Wait';
  entry: string;
  stopLoss: string;
  takeProfit: string;
}

export interface Checklist {
  location: boolean;
  momentum: boolean;
  rotation: boolean;
  setup: boolean;
  signal: boolean;
}

export interface AnalysisResult {
  location: LocationAnalysis;
  momentum: MomentumAnalysis;
  rotation: RotationAnalysis;
  setup: SetupAnalysis;
  signal: SignalAnalysis;
  tradeIdea: TradeIdea;
  checklist: Checklist;
}
