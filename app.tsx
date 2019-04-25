import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Movie, MovieCluster, Schedule, Cinema, Clusters, ClusterTitle } from './components/types';
import { MovieList } from './components/movie-list';
import { Popup } from './components/popup';
import { NavigationBar } from './components/navigation-bar';
import { SearchBar } from './components/search-bar';

export const movies: { [id: string]: Movie } = require('./export/movies.json');
export const moviesClusters: Clusters = require('./export/clusters.json');
interface AppState {
  movie: Movie,
  isOpen: boolean
  moviesCluster: MovieCluster[],
  daySelected: number;
  buttonSelected: ClusterTitle
}

class App extends React.Component<{}, AppState> {
  state: AppState = {
    isOpen: false,
    movie: movies[Object.keys(movies)[0]],
    moviesCluster: moviesClusters.recent,
    daySelected: 1,
    buttonSelected: 'recent'
  };
  setStateMovie = (movie: Movie) => {
    this.setState({
      movie,
      isOpen: true,
      daySelected: 1,
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
  render() {
    return (
      <div>
        <SearchBar setClusters={this.setClusters} setDefaultCluster={this.setBackCurrentMovieCluster}></SearchBar>
        <Popup movie={this.state.movie} isOpen={this.state.isOpen} daySelected={this.state.daySelected} setDayFn={this.setDaySelected}/>
        <MovieList clusters={this.state.moviesCluster} onClick={this.setStateMovie}/>
        <NavigationBar buttonSelected={this.state.buttonSelected} setMoviesClusterFunction={this.setMoviesCluster}/>
      </div>
    );
  }
}

ReactDOM.render(
  <App/>,
  document.getElementById('app')
);