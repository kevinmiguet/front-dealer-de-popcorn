import * as React from 'react'
import { isLegitMovieId, clusterGroups, getMovie } from '../logique/getters';
import { ClusterGroupTitles } from './types';
import { useLocalStore } from 'mobx-react-lite';
import { getSearchQueryClusters } from '../logique/search';

interface AppState {
  movieId?: string;
  showPopup?: boolean;
  showTrailer?: boolean;
  day?: number;
  cluster?: ClusterGroupTitle;
  searchQuery?: string;
}

export function getHashFromState(state: AppState): string {
    const hash = Object.keys(state)
        .filter(attribute => attribute !== 'clusters' && state[attribute])
        .map(attribute => `${attribute}/${state[attribute]}`)
        .join('/');
    return `/${hash}`;
}

export function getStateFromHash(hash: string): AppState {
    const args = hash.split('/');
    let newState: AppState = {};
    let i = 1; // first one is always #
    newState.showPopup = false; // popup is closed by default
    newState.showTrailer = false; // trailer container is hidden by default
    while (i < args.length) {
      let arg = args[i];
      let argValue = decodeURIComponent(args[i + 1]);
  
      if (arg === 'movieId') {
        let movieId = argValue;;
        // if it's not a legit Id, just don't treat this argument
        if (!isLegitMovieId(movieId)) {
          i += 2;
          continue;
        }
        newState.movieId = movieId;
        i += 2;
        continue;
      }
  
      else if (arg === 'day') {
        let day = parseInt(argValue, 10);
        const isLegitDay = day > -1 && day < 7;
        newState.day = isLegitDay ? day : 0;
        i += 2;
        continue
      }
  
      else if (arg === 'cluster') {
        // set 'recent' if argValue is not a ClusterGroupTitle
        const isClusterGroupTitle = ClusterGroupTitles.indexOf(argValue as any) >= 0;
        let clusterName: any = isClusterGroupTitle ? argValue : 'recent';
        newState.cluster = clusterName;
        i += 2;
        continue;
      }
      else if (arg === 'showTrailer') {
        newState.showTrailer = argValue === 'true' ? true : false;
        i += 2;
        continue;
      }
      else if (arg === 'showPopup') {
        newState.showPopup = argValue === 'true' ? true : false;
        i += 2;
        continue;
      }
      else if (arg === 'searchQuery') {
        newState.searchQuery = argValue;
        // this can happen if the search query was cleaned by another button
        // or if the user just landed on the page with a search query in url
        const searchField: any = document.getElementById('search-bar-input');
        if (searchField && !argValue) {
          searchField.value = '';
        }
        i += 2;
        continue;
      }
      i++;
    }
    return newState
}
export function usePrevious(value) {
  const ref = React.useRef();
  React.useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const createStore = () => {
  return {
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
  
  }
};
type Store = ReturnType<typeof createStore>;
const StoreContext = React.createContext<Store | null>(null);

export const StoreProvider = (props: { children?: React.ReactNode }) => {
  let store = useLocalStore(createStore);
  store.navigated();
  window.addEventListener('hashchange', store.navigated, false);
  return (
    <StoreContext.Provider value={store}>
      {props.children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const store = React.useContext(StoreContext);
  if (!store) {
    throw new Error("useStore: !store, did you forget StoreProvider?");
  }
  return store;
};
