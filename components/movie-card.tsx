import * as React from 'react';
import { Movie } from './types';

export class MovieCard extends React.Component<{ movie: Movie }> {
  render() {
    return (
      <li className="movie-card">
        <a href={`#/movie/${this.props.movie.id}/day/${1}`}>
          <img className="movie-poster"
            src={`./export/posters/${this.props.movie.poster}`}
          />
        </a>
        <div className="movie-title">{this.props.movie.title}</div>
        <div className="movie-director" >{this.props.movie.directors[0]}</div>
      </li>
    );
  }
}