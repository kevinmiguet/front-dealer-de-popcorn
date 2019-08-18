import * as React from 'react';
import { SearchBar } from './search-bar';
import { useObserver } from 'mobx-react-lite';
import { useStore } from './store';

export const NavigationBar: React.FunctionComponent<{}> = (props) => {
    const store = useStore();
    return useObserver(() => (
        <nav className='navigation-bar'>
            <ul className='navigation-buttons'>
                <li><a className={`navigation-button ${store.state.cluster === 'recent' ? 'selected' : ''}`} href="#/cluster/recent/searchQuery/"> Films Récents</a></li>
                <li><a className={`navigation-button ${store.state.cluster === 'retro' ? 'selected' : ''}`} href="#/cluster/retro/searchQuery/"> Retrospectives</a></li>
                <li><a className={`navigation-button ${store.state.cluster === 'old' ? 'selected' : ''}`} href="#/cluster/old/searchQuery/"> Vieux Films</a></li>
                <button className='aroundMeButton'>Around me</button>
            </ul>
            <div className='navigation-bar-right'>
                <SearchBar/>
            </div>
        </nav>
    ));
}