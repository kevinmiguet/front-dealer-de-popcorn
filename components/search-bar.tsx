import * as React from 'react';
import { getSearchResult } from '../logique/search';
import { SearchIcon } from './icons';

export class SearchBar extends React.Component<{ setClusters: Function, setDefaultCluster: Function }> {
    search = (value: string) => {
        value === ''
            ? this.props.setDefaultCluster()
            : this.props.setClusters(getSearchResult((value)))
    }
    state = {
        focused: false
    }

    onFocus = () => this.setState({focused: true})
    onBlur = () => this.setState({focused: false})
    focus = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.preventDefault(); // so that we don't blur
        const searchInput = document.getElementById('search-bar-input');
        if(document.activeElement !== searchInput){
            searchInput.focus()
        }
    }
    getClassName = () => `search-bar-element ${this.state.focused ? 'focused' : ''}`
    
    render() {
        return (
            <div onMouseDown={(event) =>this.focus(event)} id='search-bar-container' className={this.getClassName()}>
                <SearchIcon/>
                <input
                    id='search-bar-input'
                    type='text'
                    placeholder='Vous cherchez un film en particulier ?'
                    className={this.getClassName()}
                    onKeyUp={() => this.search((document.getElementById('search-bar-input') as any).value)}
                    onFocus={() => this.onFocus()}
                    onBlur={() => this.onBlur()}
                ></input>
            </div>
        );
    }
}