import * as React from 'react';
import { getSearchResult } from '../logique/search';

export class SearchBar extends React.Component<{ setClusters: Function, setDefaultCluster: Function }> {
    search = (value: string) => {
        value === ''
            ? this.props.setDefaultCluster()
            : this.props.setClusters(getSearchResult((value)))
    }
    render() {
        return (
            <div>
                <input
                    id='search-bar'
                    type='text'
                    placeholder='Vous cherchez un film en particulier ?'
                    onKeyUp={() => this.search((document.getElementById('search-bar') as any).value)}
                ></input>

            </div>
        );
    }
}