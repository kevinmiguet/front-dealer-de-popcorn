import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Cluster, ClusterGroupTitle, ClusterGroupTitles } from './components/types';
import { MovieList } from './components/movie-list';
import { Popup, currentDay } from './components/popup';
import { NavigationBar } from './components/navigation-bar';
import { isLegitMovieId, getClusterGroup, getMovie, movies, clusterGroups } from './logique/getters';

function getStateFromHash(hash: string): AppState {
  const args = hash.split('/');
  let newState: AppState = {};
  let i = 1; // first one is always #
  newState.isPopupOpened = false; // popup is closed by default
  while (i < args.length) {
    let arg = args[i];
    let argValue = args[i + 1]

    if (arg === 'movie') {
      let movieId = argValue;;
      // if it's not a legit Id, just don't treat this argument
      if (!isLegitMovieId(movieId)) {
        i += 2;
        continue;
      }
      newState.movieId = movieId;
      newState.isPopupOpened = true;
      i += 2;
      continue;
    }

    else if (arg === 'day') {
      let daySelected = parseInt(argValue, 10);
      const isLegitDay = daySelected > -1 && daySelected < 7;
      newState.daySelected = isLegitDay ? daySelected : 0;
      i += 2;
      continue
    }

    else if (arg === 'cluster') {
      // set 'recent' if argValue is not a ClusterGroupTitle
      const isClusterGroupTitle = ClusterGroupTitles.indexOf(argValue as any) >= 0;
      let clusterName: any = isClusterGroupTitle ? argValue : 'recent';
      newState.clusters = getClusterGroup(clusterName);
      newState.clusterSelected = clusterName;
      i += 2;
      continue;
    }
    i++;
  }
  return newState
}

export interface AppState {
  movieId?: string,
  isPopupOpened?: boolean
  clusters?: Cluster[],
  daySelected?: number;
  clusterSelected?: ClusterGroupTitle
}

class App extends React.Component<{}, AppState> {
  state: AppState = {
    isPopupOpened: false,
    movieId: Object.keys(movies)[0],
    clusters: clusterGroups.recent,
    daySelected: currentDay,
    clusterSelected: 'recent'
  };
  
  // used by search bar
  setClusters = (clusters: Cluster[]) => {
    this.setState({
      clusters: clusters
    });
  }

  setBackCurrentMovieCluster = () => {
    const clusterTitle = this.state.clusterSelected;
    this.setState({
      clusters: clusterGroups[clusterTitle],
      clusterSelected: clusterTitle,
      isPopupOpened: false,
    })
  }

  getDefaultUrl = (): string => `#/cluster/${this.state.clusterSelected}`
  

  navigated = () => {
    const newState = getStateFromHash(window.location.hash)
    this.setState(newState);
  }

  componentWillMount() {
    // Handle the initial route
    this.navigated();
    // Handle browser navigation events
    window.addEventListener('hashchange', this.navigated, false);
  }
  render() {
    return (
      <div>
        <Popup movie={getMovie(this.state.movieId)} isPopupOpened={this.state.isPopupOpened} daySelected={this.state.daySelected} getDefaultUrl={this.getDefaultUrl} />
        <MovieList clusters={this.state.clusters} isPopupOpened={this.state.isPopupOpened} getDefaultUrl={this.getDefaultUrl} />
        <NavigationBar clusterSelected={this.state.clusterSelected} setClusters={this.setClusters} setDefaultCluster={this.setBackCurrentMovieCluster} />
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);