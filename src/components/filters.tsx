import * as React from 'react';
import { FilterIcon, CheckedIcon } from './icons';

export const FilterButton: React.FunctionComponent<{}> = (props) => (
    <button
        id='filter-button'
        className='stylish button'
    >
        Filtres
        <FilterIcon />
    </button>
);

export const FilterOption: React.FunctionComponent<{ value: string }> = (props) => {
    const [selected, setSelected] = React.useState(false)
    return (
        <button
            className= {
                `button
                filter-option
                ${selected ? 'selected' : ''}
            `}

            onClick={() => setSelected(!selected)}
        >
            {props.value}
            <CheckedIcon show={selected} />
        
        </button>
    )
};

export const FilterDropdown: React.FunctionComponent<{title: string, values: string[]}> = (props) => {
    return (
        <div className='filter-dropdown' id={`filter-dropdown-${props.title}`}>
            
            <h3 className='filter-dropdown-title'>
                {props.title}
            </h3>
            
            <ul className='filter-dropdown-values'>
                {props.values.map(value => <FilterOption value={value}/>)}
            </ul>
        </div>
    );
}