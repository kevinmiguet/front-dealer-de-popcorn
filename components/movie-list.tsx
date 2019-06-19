import * as React from 'react';
import { Cluster } from './types';
import { MovieCard } from './movie-card';
import { getMovie } from '../logique/getters';

export class MovieList extends React.Component<{ clusters: Cluster[] }> {
    render() {
        return (
            <div className='movieList'>
                {this.props.clusters.map(
                    (cluster, clusterIndex) => (
                        <div key={clusterIndex} className='cluster'>
                            {cluster.title !== '' ? <div className='cluster-title'>{cluster.title}</div> : ''}
                            <div className='cluster-content'>
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

