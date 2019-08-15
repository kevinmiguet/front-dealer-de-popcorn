import * as React from 'react';

export const CloseIcon: React.FunctionComponent<{}> = (props) => (
    <svg className="close-icon" width="10" height="16" viewBox="0 0 5 8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 1L1 4" stroke="white" stroke-width="1" stroke-linecap="round" />
        <path d="M1 4L4 7" stroke="white" stroke-width="1" stroke-linecap="round" />
    </svg>
);
export const SearchIcon: React.FunctionComponent<{}> = (props) => (
    <svg className="search-icon" width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.28463 8.88907L14 13M10.4382 5.70193C10.4382 8.29874 8.3254 10.4039 5.71911 10.4039C3.11282 10.4039 1 8.29874 1 5.70193C1 3.10513 3.11282 1 5.71911 1C8.3254 1 10.4382 3.10513 10.4382 5.70193Z" stroke="#7C8FF8" stroke-width="2" stroke-linecap="round" strokeLinejoin="round" />
    </svg>
);

export const FilterIcon: React.FunctionComponent<{}> = (props) => (
    <svg className="filter-icon" width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="11.1666" y1="1" x2="11.1666" y2="11" stroke="#7C8FF8" stroke-width="2" stroke-linecap="round" />
        <line x1="2" y1="1" x2="2" y2="11" stroke="#7C8FF8" stroke-width="2" stroke-linecap="round" />
        <line x1="6.58337" y1="1" x2="6.58337" y2="11" stroke="#7C8FF8" stroke-width="2" stroke-linecap="round" />
        <rect x="-0.5" y="0.5" width="2.83333" height="1.8" transform="matrix(1 0 0 -1 1 8.20007)" stroke="#7C8FF8" stroke-linecap="round" strokeLinejoin="round" />
        <rect x="-0.5" y="0.5" width="2.83333" height="1.8" transform="matrix(1 0 0 -1 5.58337 5.79993)" stroke="#7C8FF8" stroke-linecap="round" strokeLinejoin="round" />
        <rect x="-0.5" y="0.5" width="2.83333" height="1.8" transform="matrix(1 0 0 -1 10.1666 7.40002)" stroke="#7C8FF8" stroke-linecap="round" strokeLinejoin="round" />
    </svg>
);
