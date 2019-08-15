import * as React from 'react';
import { ClusterGroupTitle, SetStateAndUpdateHashFn } from './types';
import { SearchBar } from './search-bar';
import { FilterIcon } from './icons';

interface NavigationBarProps {
    cluster: ClusterGroupTitle,
    setStateAndUpdateHash: SetStateAndUpdateHashFn,
}
export class NavigationBar extends React.Component<NavigationBarProps> {
    render() {
        return (
            <nav className='navigation-bar'>
                <ul className='navigation-buttons'>
                    <li><a className={`navigation-button ${this.props.cluster === 'recent' ? 'selected' : ''}`} href="#/cluster/recent"> Films Récents</a></li>
                    <li><a className={`navigation-button ${this.props.cluster === 'retro' ? 'selected' : ''}`} href="#/cluster/retro"> Retrospectives</a></li>
                    <li><a className={`navigation-button ${this.props.cluster === 'old' ? 'selected' : ''}`} href="#/cluster/old"> Vieux Films</a></li>
                    <button className='aroundMeButton'>Around me</button>
                </ul>
                <div className='navigation-bar-right'>
                    <SearchBar setStateAndUpdateHash={this.props.setStateAndUpdateHash}></SearchBar>
                </div>
            </nav>
        )
    }
}