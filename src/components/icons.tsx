import * as React from 'react';

export const CloseIcon: React.FunctionComponent<{}> = (props) => (
    <svg className="close-icon" width="10" height="16" viewBox="0 0 5 8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 1L1 4" stroke="white" strokeWidth="1" strokeLinecap="round" />
        <path d="M1 4L4 7" stroke="white" strokeWidth="1" strokeLinecap="round" />
    </svg>
);
export const SearchIcon: React.FunctionComponent<{}> = (props) => (
    <svg className="search-icon" width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.28463 8.88907L14 13M10.4382 5.70193C10.4382 8.29874 8.3254 10.4039 5.71911 10.4039C3.11282 10.4039 1 8.29874 1 5.70193C1 3.10513 3.11282 1 5.71911 1C8.3254 1 10.4382 3.10513 10.4382 5.70193Z" stroke="#7C8FF8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

export const FilterIcon: React.FunctionComponent<{}> = (props) => (
    <svg className="icon filter-icon" width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="11.1666" y1="1" x2="11.1666" y2="11" stroke="#7C8FF8" strokeWidth="2" strokeLinecap="round" />
        <line x1="2" y1="1" x2="2" y2="11" stroke="#7C8FF8" strokeWidth="2" strokeLinecap="round" />
        <line x1="6.58337" y1="1" x2="6.58337" y2="11" stroke="#7C8FF8" strokeWidth="2" strokeLinecap="round" />
        <rect x="-0.5" y="0.5" width="2.83333" height="1.8" transform="matrix(1 0 0 -1 1 8.20007)" stroke="#7C8FF8" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="-0.5" y="0.5" width="2.83333" height="1.8" transform="matrix(1 0 0 -1 5.58337 5.79993)" stroke="#7C8FF8" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="-0.5" y="0.5" width="2.83333" height="1.8" transform="matrix(1 0 0 -1 10.1666 7.40002)" stroke="#7C8FF8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

export const DistanceIcon: React.FunctionComponent<{}> = (props) => (
    <svg className="distance-icon" width="35px" height="35px" viewBox="0 0 256 256" {...props}>
        <title>DistanceIcon</title>
        <path fill="white" d="M56 16C29.531 16 8 37.438 8 63.813 8 80.858 18.14 95.983 28.875 112c10.25 15.266 20.828 31.063 23.14 49.5.25 2 1.954 3.5 3.985 3.5 2.016 0 3.703-1.5 3.953-3.5 2.328-18.422 12.922-34.219 23.172-49.5C93.859 96 104 80.86 104 63.812 104 37.439 82.469 16 56 16zm0 8c22.063 0 40 17.86 40 39.813 0 14.609-9.484 28.765-19.531 43.75-7.75 11.546-15.688 23.39-20.469 36.687-4.797-13.297-12.734-25.14-20.469-36.703C25.484 92.578 16 78.422 16 63.813 16 41.858 33.938 24 56 24zm-5.578 16.938a3.708 3.708 0 00-1.594.156C38.766 44.234 32 53.437 32 64c0 13.234 10.766 24 24 24s24-10.766 24-24c0-2.203-1.781-4-4-4-2.219 0-4 1.797-4 4 0 8.828-7.172 16-16 16s-16-7.172-16-16c0-7.031 4.5-13.172 11.219-15.266a4.012 4.012 0 002.625-5.015 3.982 3.982 0 00-3.422-2.782zm12.89.468a3.962 3.962 0 00-3.624 2.532 3.973 3.973 0 002.234 5.187 16.114 16.114 0 015.781 3.953 3.937 3.937 0 002.922 1.281c.969 0 1.953-.359 2.734-1.078 1.61-1.515 1.704-4.047.204-5.656a24.551 24.551 0 00-8.688-5.938 3.942 3.942 0 00-1.563-.28zM56 56c-4.422 0-8 3.578-8 8 0 4.422 3.578 8 8 8 4.422 0 8-3.578 8-8 0-4.422-3.578-8-8-8zm144 40c-26.469 0-48 21.438-48 47.813 0 17.046 10.14 32.171 20.875 48.187 10.25 15.281 20.828 31.078 23.14 49.5.25 2 1.954 3.5 3.985 3.5 2.016 0 3.703-1.5 3.953-3.5 2.328-18.422 12.922-34.219 23.172-49.5C237.859 175.984 248 160.86 248 143.812 248 117.438 226.469 96 200 96zm0 8c22.063 0 40 17.86 40 39.813 0 14.609-9.484 28.765-19.531 43.75-7.75 11.546-15.688 23.39-20.469 36.687-4.797-13.297-12.734-25.14-20.484-36.703C169.484 172.578 160 158.422 160 143.813 160 121.858 177.938 104 200 104zm-5.578 16.938a3.708 3.708 0 00-1.594.156C182.766 124.234 176 133.438 176 144c0 13.234 10.766 24 24 24s24-10.766 24-24c0-2.203-1.781-4-4-4-2.219 0-4 1.797-4 4 0 8.828-7.172 16-16 16s-16-7.172-16-16c0-7.031 4.5-13.172 11.219-15.266a4.012 4.012 0 002.625-5.015 3.982 3.982 0 00-3.422-2.781zm12.89.468a3.962 3.962 0 00-3.625 2.531 3.973 3.973 0 002.235 5.188 16.114 16.114 0 015.781 3.953 3.937 3.937 0 002.922 1.281c.969 0 1.953-.359 2.734-1.078 1.61-1.515 1.703-4.047.203-5.656a24.551 24.551 0 00-8.687-5.938 3.942 3.942 0 00-1.563-.28zM80 136c-2.219 0-4 1.797-4 4v8c0 2.203 1.781 4 4 4 2.219 0 4-1.797 4-4v-8c0-2.203-1.781-4-4-4zm20 0c-2.219 0-4 1.797-4 4v8c0 2.203 1.781 4 4 4 2.219 0 4-1.797 4-4v-8c0-2.203-1.781-4-4-4zm20 0c-2.219 0-4 1.797-4 4v8c0 2.203 1.781 4 4 4 2.219 0 4-1.797 4-4v-8c0-2.203-1.781-4-4-4zm20 0c-2.219 0-4 1.797-4 4v8c0 2.203 1.781 4 4 4 2.219 0 4-1.797 4-4v-8c0-2.203-1.781-4-4-4zm60 0c-4.422 0-8 3.578-8 8 0 4.422 3.578 8 8 8 4.422 0 8-3.578 8-8 0-4.422-3.578-8-8-8zm0 0" />
    </svg>
);

export const CheckedIcon: React.FunctionComponent<{show: boolean}> = (props) => (
    <svg className={`checked-icon ${props.show ? 'show' : ''}`} width="7" height="6" viewBox="0 0 7 6" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1.37353 2.98762L2.90714 4.71851" stroke="#01D3D2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2.90698 4.71851L5.45175 0.937791" stroke="#01D3D2" strokeLinecap="round"/>
    </svg>
);


