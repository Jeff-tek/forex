import React from 'react';

export const Icon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    {props.children}
  </svg>
);

export const UploadIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
    </Icon>
);

export const XCircleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props} strokeWidth={1.5} fill="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </Icon>
);

export const SparklesIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props} fill="currentColor">
        <path fillRule="evenodd" clipRule="evenodd" d="M12.965 2.54436C12.5855 1.78519 11.4145 1.78519 11.035 2.54436L10.0526 4.50977C9.87073 4.87383 9.5302 5.15535 9.13883 5.25055L7.00889 5.75949C6.15589 5.96865 5.81944 6.98418 6.43899 7.60372L7.91842 9.08316C8.2013 9.36604 8.32924 9.76683 8.26762 10.1584L7.94051 12.2727C7.79331 13.12 8.61863 13.7848 9.39572 13.389L11.3611 12.4066C11.7252 12.2247 12.1527 12.2247 12.5168 12.4066L14.4822 13.389C15.2593 13.7848 16.0846 13.12 15.9374 12.2727L15.6103 10.1584C15.5487 9.76683 15.6766 9.36604 15.9595 9.08316L17.439 7.60372C18.0585 6.98418 17.7221 5.96865 16.8691 5.75949L14.7391 5.25055C14.3478 5.15535 14.0072 4.87383 13.8253 4.50977L12.965 2.54436Z" />
        <path d="M7.99999 15.5H7.49999C6.94771 15.5 6.49999 15.9477 6.49999 16.5V17C6.49999 17.5523 6.94771 18 7.49999 18H7.99999C8.55227 18 8.99999 17.5523 8.99999 17V16.5C8.99999 15.9477 8.55227 15.5 7.99999 15.5Z" />
        <path d="M16.5 18.5H16C15.4477 18.5 15 18.9477 15 19.5V20C15 20.5523 15.4477 21 16 21H16.5C17.0523 21 17.5 20.5523 17.5 20V19.5C17.5 18.9477 17.0523 18.5 16.5 18.5Z" />
        <path d="M4.5 6H4C3.44772 6 3 6.44772 3 7V7.5C3 8.05228 3.44772 8.5 4 8.5H4.5C5.05228 8.5 5.5 8.05228 5.5 7.5V7C5.5 6.44772 5.05228 6 4.5 6Z" />
        <path d="M19.5 5.5H19C18.4477 5.5 18 5.94772 18 6.5V7C18 7.55228 18.4477 8 19 8H19.5C20.0523 8 20.5 7.55228 20.5 7V6.5C20.5 5.94772 20.0523 5.5 19.5 5.5Z" />
    </Icon>
);

export const CheckCircleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props} fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </Icon>
);

export const LoadingSpinnerIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props} className={`animate-spin ${props.className || ''}`} stroke="currentColor">
        <path d="M12 3v3m0 12v3m9-9h-3M6 12H3m7.07-7.07L9 6.93M15 15l-1.07-1.07M9 17.07L6.93 15M17.07 9L15 6.93" />
    </Icon>
);

export const LightBulbIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </Icon>
);

export const ChevronDownIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <Icon {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </Icon>
);

export const LocationMarkerIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <Icon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></Icon>
);
export const TrendingUpIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <Icon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></Icon>
);
export const RefreshIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <Icon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h5M20 20v-5h-5" /><path strokeLinecap="round" strokeLinejoin="round" d="M4 9a9 9 0 0114.13-4.13M20 15a9 9 0 01-14.13 4.13" /></Icon>
);
export const PuzzleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <Icon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" /></Icon>
);
export const BellIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <Icon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></Icon>
);

export const ClipboardCheckIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <Icon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></Icon>
);

export const ChartBarIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props} fill="currentColor">
        <path d="M12 6.25278C12 5.56041 12.5604 5 13.2528 5H14.7472C15.4396 5 16 5.56041 16 6.25278V19C16 19.5523 15.5523 20 15 20H13C12.4477 20 12 19.5523 12 19V6.25278Z" />
        <path d="M5.25278 10C4.56041 10 4 10.5604 4 11.2528V19C4 19.5523 4.44772 20 5 20H7C7.55228 20 8 19.5523 8 19V11.2528C8 10.5604 7.43959 10 6.74722 10H5.25278Z" />
        <path d="M19.2528 14C18.5604 14 18 14.5604 18 15.2528V19C18 19.5523 18.4477 20 19 20H21C21.5523 20 22 19.5523 22 19V15.2528C22 14.5604 21.4396 14 20.7472 14H19.2528Z" />
    </Icon>
);

export const InformationCircleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <Icon {...props} strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </Icon>
);