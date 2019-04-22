import * as React from 'react';
import { Movie } from './types';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
 
export class MovieCard extends React.Component<{movie: Movie, onClick: Function}> {
  render() {
      return (
          <li className="movie-card">
            <LazyLoadImage className="movie-poster" 
              src={`./export/posters/${this.props.movie.poster}`} 
              effect="blur"
              threshold="1000"
              onClick={() => this.props.onClick()}
              width= "103px"
              height= "146px"
              
            />
            <div className="movie-title">{this.props.movie.title}</div>
            <div className="movie-director" >{this.props.movie.directors[0]}</div>
          </li>
    );
  }
}