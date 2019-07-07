import * as React from 'react';
import { Cluster } from './types';
import { MovieCard } from './movie-card';
import { getMovie } from '../logique/getters';
import { scrollTop } from '../logique/utils';

export class Content extends React.Component<{ clusters: Cluster[], isPopupOpened: boolean, getDefaultUrl: Function }> {
    componentDidUpdate() {
        scrollTop();
    }
    render() {
        return (
            <div id="content">
                <a id="dark-layer-container" href={this.props.getDefaultUrl()}>
                    <div id="dark-layer" className={this.props.isPopupOpened ? 'visible' : 'invisible'}></div>
                </a>
                <div className="movie-list" >
                    {this.props.clusters.map(
                        (cluster, clusterIndex) => <ClusterElement key={clusterIndex} cluster={cluster} />
                    )}
                </div>
            </div>
        );
    }
}

const ClusterElement: React.FunctionComponent<{ cluster: Cluster }> = ({ cluster }) => (
    <div className='cluster'>
        {cluster.title !== '' ? <div className='cluster-title'>{cluster.title}</div> : ''}
        <div className='cluster-content'>
            {cluster.movieIds.map(movieId => (
                <MovieCard key={movieId} movie={getMovie(movieId)}></MovieCard>
            ))}
        </div>
    </div>
)