import * as React from 'react';
import { ClusterGroupTitle } from './types';
import { SearchBar } from './search-bar';

interface NavigationBarProps {
    buttonSelected: ClusterGroupTitle,
    setClusters: Function,
    setDefaultCluster: Function
}
export class NavigationBar extends React.Component<NavigationBarProps> {
    render() {
        return (
            <nav>
                <ul className={'navigation-buttons'}>
                    <li><a className={`navigation-button ${this.props.buttonSelected === 'recent' ? 'selected' : ''}`} href="#/cluster/recent"> Films Récents</a></li>
                    <li><a className={`navigation-button ${this.props.buttonSelected === 'retro' ? 'selected' : ''}`} href="#/cluster/retro" > Retrospectives</a></li>
                    <li><a className={`navigation-button ${this.props.buttonSelected === 'old' ? 'selected' : ''}`} href="#/cluster/old" > Vieux Films</a></li>
                    <SearchBar setClusters={this.props.setClusters} setDefaultCluster={this.props.setDefaultCluster}></SearchBar>
                </ul>
            </nav>
        )
    }
}