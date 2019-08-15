import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ClusterGroupTitle, ClusterGroupTitles } from './components/types';
import { Content } from './components/content';
import { Popup, currentDay, TrailerContainer } from './components/popup';
import { NavigationBar } from './components/navigation-bar';
import { isLegitMovieId, getClusterGroup, getMovie, clusterGroups } from './logique/getters';
import { getSearchQueryClusters } from './logique/search';

function getHashFromState(state: AppState): string {
  const hash = Object.keys(state)
    .filter(attribute => attribute !== 'clusters' && state[attribute])
    .map(attribute => `${attribute}/${state[attribute]}`)
    .join('/');
    return `/${hash}`;
}

function getStateFromHash(hash: string): AppState {
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

export interface AppState {
  movieId?: string;
  showPopup?: boolean;
  showTrailer?: boolean;
  day?: number;
  cluster?: ClusterGroupTitle;
  searchQuery?: string;
}

class App extends React.Component<{}, AppState> {
  state: AppState = {
    showPopup: false,
    showTrailer: false,
    movieId: null,
    day: currentDay,
    cluster: 'recent',
  };
  
  setStateAndUpdateHash = (updatedState: AppState) => {
    this.setState(
      {...updatedState}, 
      () => window.location.hash = getHashFromState(this.state)
    )
  }

  navigated = () => {
    const newState = getStateFromHash(window.location.hash)
    this.setState(newState);
  }

  async componentWillMount() {
    // Handle the initial route
    this.navigated();
    // Handle browser navigation events
    window.addEventListener('hashchange', this.navigated, false);
  }

  render() {
    return (
      <div>
        <Popup 
          movie={getMovie(this.state.movieId)} 
          showPopup={this.state.showPopup} 
          day={this.state.day} 
          setStateAndUpdateHash={this.setStateAndUpdateHash} 
        />

        <Content 
          clusters={this.state.searchQuery ? 
            getSearchQueryClusters(this.state.searchQuery) :
            clusterGroups[this.state.cluster] }
          showPopup={this.state.showPopup}
          showTrailer={this.state.showTrailer}
          setStateAndUpdateHash={this.setStateAndUpdateHash} 
        />
        
        <NavigationBar 
          cluster={this.state.cluster}
          setStateAndUpdateHash={this.setStateAndUpdateHash}
        />
        
        <TrailerContainer 
          showTrailer={this.state.showTrailer} 
          trailerId={this.state.movieId && getMovie(this.state.movieId).trailerId}
        />
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);