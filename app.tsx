import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { MovieCluster, ClusterTitle, ClusterTitles } from './components/types';
import { MovieList } from './components/movie-list';
import { Popup, currentDay } from './components/popup';
import { NavigationBar } from './components/navigation-bar';
import { SearchBar } from './components/search-bar';
import { isLegitMovieId, moviesClusters, getMovieCluster, getMovie, movies } from './logique/getters';

function getStateFromHash(hash: string): AppState {
  const args = hash.split('/');
  let newState: AppState = {};
  let i = 1; // first one is always #
  newState.isOpen = false; // popup is closed by default
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
      newState.moviesCluster = getMovieCluster(clusterName);
      newState.buttonSelected = clusterName;
      i += 2;
      continue;
    }
    i++;
  }

  return newState
}


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
    daySelected: currentDay,
    buttonSelected: 'recent'
  };
  
  setStateMovie = (movieId: string) => {
    this.setState({
      movieId,
      isOpen: true,
      daySelected: currentDay,
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
  // used by search bar
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
        <Popup movie={getMovie(this.state.movieId)} isOpen={this.state.isOpen} daySelected={this.state.daySelected} />
        <MovieList clusters={this.state.moviesCluster} />
        <NavigationBar buttonSelected={this.state.buttonSelected} setClusters={this.setClusters} setDefaultCluster={this.setBackCurrentMovieCluster} />
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);