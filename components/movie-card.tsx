import * as React from 'react';
import { Movie } from './types';
import { currentDay } from './popup';

export class MovieCard extends React.Component<{ movie: Movie }> {
  render() {
    return (
      <li className="movie-card">
        <a href={`#/movie/${this.props.movie.id}/day/${currentDay}`}>
          <img className="movie-poster"
            src={getPosterSrc(this.props.movie.poster)} 
          />
        </a>
        <div className="movie-title">{this.props.movie.title}</div>
        <div className="movie-director" >{this.props.movie.directors[0]}</div>
      </li>
    );
  }
}

const getPosterSrc = (poster: string): string => {
  if (poster) {
    return `./export/posters/${poster}`
  }
  return './assets/default-poster.jpg'
}