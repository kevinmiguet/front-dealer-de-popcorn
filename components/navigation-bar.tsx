import * as React from 'react';
import { ClusterTitle } from './types';

interface NavigationBarProps {
    buttonSelected: ClusterTitle,
}
export class NavigationBar extends React.Component<NavigationBarProps> {
    render() {
        return (
            <nav>
                <ul className={'navigation-buttons'}>
                    <li><a className={`navigation-button ${this.props.buttonSelected === 'recent' ? 'selected': ''}`} href="#/cluster/recent"> Films Récents</a></li>
                    <li><a className={`navigation-button ${this.props.buttonSelected === 'retro' ? 'selected': ''}`} href="#/cluster/retro" > Retrospectives</a></li>
                    <li><a className={`navigation-button ${this.props.buttonSelected === 'old' ? 'selected': ''}`} href="#/cluster/old" > Vieux Films</a></li>
                </ul>
            </nav>
        )
    }
}