import * as React from 'react';
import { MovieCluster } from './types';
import { MovieCard } from './movie-card';
import { getMovie } from '../logique/getters';

export class MovieList extends React.Component<{ clusters: MovieCluster[] }> {
    render() {
        return (
            <div className='movieList'>
                {this.props.clusters.map(
                    (cluster, clusterIndex) => (
                        <div key={clusterIndex} className='movieCluster'>
                            {cluster.title !== '' ? <div className='movieCluster-title'>{cluster.title}</div> : ''}
                            <div className='movieCluster-content'>
                                {cluster.movieIds.map(movieId => (
                                    <MovieCard key={movieId} movie={getMovie(movieId)}></MovieCard>
                                ))}
                            </div>
                        </div>
                    ))}
            </div>
        );
    }
}

