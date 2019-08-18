import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { useLocalStore, useObserver } from 'mobx-react-lite'
import { ClusterGroupTitle } from './components/types';
import { Content } from './components/content';
import { Popup, TrailerContainer } from './components/popup';
import { NavigationBar } from './components/navigation-bar';
import { clusterGroups, getMovie } from './logique/getters';
import { getSearchQueryClusters } from './logique/search';
import { getHashFromState, getStateFromHash } from './components/store';

export function usePrevious(value) {
  const ref = React.useRef();
  React.useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}


export interface AppState {
  movieId?: string;
  showPopup?: boolean;
  showTrailer?: boolean;
  day?: number;
  cluster?: ClusterGroupTitle;
  searchQuery?: string;
}

export const App: React.FunctionComponent<{}> = (() => {
  let store = useLocalStore(() => ({
    state: {
      showPopup: false,
      showTrailer: false,
      movieId: null,
      day: 0,
      cluster: 'recent',
    } as AppState,

    setStateAndUpdateHash(updatedState: AppState) {
      this.state = { ...this.state, ...updatedState };
      window.location.hash = getHashFromState(this.state)
    },
    navigated() {
      const newState = getStateFromHash(window.location.hash);
      this.state = {...this.state, ...newState};
    },
    get clusters(){
      return this.state.searchQuery ? 
        getSearchQueryClusters(this.state.searchQuery) :
        clusterGroups[this.state.cluster] 
    },
    get movie() {
      return this.state.movieId && getMovie(this.state.movieId)
    }
  
  }));

  store.navigated();
  window.addEventListener('hashchange', store.navigated, false);

  return useObserver(() => (
    <div>
      <NavigationBar store={store} />
      <Content store={store} />
      <Popup store={store}/>
      <TrailerContainer store={store}/>
    </div>
  ));
})

ReactDOM.render(
  <App />,
  document.getElementById('app')
);