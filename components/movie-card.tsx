import * as React from 'react';
import { Movie } from './types';

export class MovieCard extends React.Component<{movie: Movie, onClick: Function}> {
  render() {
      return (
          <li className="movie-card">
            <img className="movie-poster" src={`./export/posters/${this.props.movie.poster}`} onClick={() => this.props.onClick()}></img>
            <div className="movie-title">{this.props.movie.title}</div>
            <div className="movie-director" >{this.props.movie.directors[0]}</div>
          </li>
    );
  }
}