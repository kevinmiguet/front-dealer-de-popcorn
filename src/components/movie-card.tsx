import * as React from 'react';
import { Movie } from './types';
import { currentDay } from './popup';
import { useObserver } from 'mobx-react-lite';

const getPosterSrc = (poster: string): string => {
  if (poster) {
    return `./export/posters/${poster}`
  }
  return './assets/default-poster.jpg'
}

export const MovieCard: React.FunctionComponent<{ movie: Movie }> = (props) => useObserver(() => (
  <li className="movie-card">
    <a href={`#/movieId/${props.movie.id}/day/${currentDay}/showPopup/true`}>
      <img className="movie-poster"
        src={getPosterSrc(props.movie.poster)}
      />
    </a>
    <div className="movie-title">{props.movie.title}</div>
    <div className="movie-director" >{props.movie.directors[0]}</div>
  </li>
));
