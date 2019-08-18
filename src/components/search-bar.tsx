import * as React from 'react';
import { SearchIcon } from './icons';
import { useObserver } from 'mobx-react-lite';

export const SearchBar: React.FunctionComponent<{store: any}> = (props) => {
    const [focused, setFocused] = React.useState(false);
    let {store} = props;
    const search = (_value: string) => {
        const searchQuery = _value.trim()
        console.log(searchQuery);
        store.setStateAndUpdateHash({ searchQuery })
    }

    const onFocus = () => setFocused(true);
    const onBlur = () => setFocused(false);

    const focus = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.preventDefault(); // so that we don't blur
        const searchInput = document.getElementById('search-bar-input');
        if (document.activeElement !== searchInput) {
            searchInput.focus()
        }
    }
    let getClassName = () => `search-bar-element ${focused ? 'focused' : ''}`

    return (
        <div onMouseDown={(event) => focus(event)} id='search-bar-container' className={getClassName()}>
            <SearchIcon />
            <input
                id='search-bar-input'
                type='text'
                placeholder='Vous cherchez un film en particulier ?'
                className={getClassName()}
                onKeyUp={() => search((document.getElementById('search-bar-input') as any).value)}
                onFocus={() => onFocus()}
                onBlur={() => onBlur()}
            ></input>
        </div>
    );
}