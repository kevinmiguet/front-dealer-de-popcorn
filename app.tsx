import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Movie, MovieCluster, Schedule, Cinema, Clusters, ClusterTitle, ClusterTitles } from './components/types';
import { MovieList } from './components/movie-list';
import { Popup } from './components/popup';
import { NavigationBar } from './components/navigation-bar';
import { SearchBar } from './components/search-bar';

function getStateFromHash(hash: string): AppState {
  const args = hash.split('/');
  let newState: AppState = {};
  let i = 1; // first one is always #
  newState.isOpen = false; // popup is closed by default
  while (i < args.length) {
    let arg = args[i];
    let argValue = args[i + 1]

    if (arg === 'movie') {
      let movieId = argValue;
      const isLegitId = Object.keys(movies).indexOf(movieId as any) > 0;
      // if it's not a legit Id, just don't treat this argument
      if (!isLegitId) {
        i += 2;
        continue;
      }
      newState.movieId = movieId;
      newState.isOpen = true;
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
      // set 'recent' if argValue is not a ClusterTitle
      const isClusterTitle = ClusterTitles.indexOf(argValue as any) >= 0;
      let clusterName: any = isClusterTitle ? argValue : 'recent';
      newState.moviesCluster = moviesClusters[clusterName];
      newState.buttonSelected = clusterName;
      i += 2;
      continue;
    }
    i++;
  }

  return newState
}

export const movies: { [id: string]: Movie } = require('./export/movies.json');
export const moviesClusters: Clusters = require('./export/clusters.json');
interface AppState {
  movieId?: string,
  isOpen?: boolean
  moviesCluster?: MovieCluster[],
  daySelected?: number;
  buttonSelected?: ClusterTitle
}

class App extends React.Component<{}, AppState> {
  state: AppState = {
    isOpen: false,
    movieId: Object.keys(movies)[0],
    moviesCluster: moviesClusters.recent,
    daySelected: 0,
    buttonSelected: 'recent'
  };
  setStateMovie = (movieId: string) => {
    this.setState({
      movieId,
      isOpen: true,
      daySelected: 0,
    });
  }
  setDaySelected = (day: number) => {
    this.setState({
      daySelected: day
    })
  }
  setMoviesCluster = (clusterTitle: ClusterTitle) => {
    this.setState({
      moviesCluster: moviesClusters[clusterTitle],
      buttonSelected: clusterTitle,
      isOpen: false,
    })
  }
  setClusters = (clusters: MovieCluster[]) => {
    this.setState({
      moviesCluster: clusters
    });
  }
  setBackCurrentMovieCluster = () => {
    this.setMoviesCluster(this.state.buttonSelected);
  }
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
        <SearchBar setClusters={this.setClusters} setDefaultCluster={this.setBackCurrentMovieCluster}></SearchBar>
        <Popup movie={movies[this.state.movieId]} isOpen={this.state.isOpen} daySelected={this.state.daySelected} />
        <MovieList clusters={this.state.moviesCluster} />
        <NavigationBar buttonSelected={this.state.buttonSelected} />
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);