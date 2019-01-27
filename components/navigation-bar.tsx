import * as React from 'react';
import { ClusterTitle } from './types';

interface NavigationBarProps {
    setMoviesClusterFunction: (arg: ClusterTitle)=> any,
    buttonSelected: ClusterTitle,
}
export class NavigationBar extends React.Component<NavigationBarProps> {
    render() {
        return (
            <nav>
                <ul className={'navigation-buttons'}>
                    <li><a className={`navigation-button ${this.props.buttonSelected === 'recent' ? 'selected': ''}`} onClick={() => this.props.setMoviesClusterFunction('recent')}> Films Récents</a></li>
                    <li><a className={`navigation-button ${this.props.buttonSelected === 'retro' ? 'selected': ''}`} onClick={() => this.props.setMoviesClusterFunction('retro')}> Retrospectives</a></li>
                    <li><a className={`navigation-button ${this.props.buttonSelected === 'old' ? 'selected': ''}`} onClick={() => this.props.setMoviesClusterFunction('old')}> Vieux Films</a></li>
                </ul>
            </nav>
        )
    }
}