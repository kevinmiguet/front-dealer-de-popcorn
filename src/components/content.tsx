import * as React from 'react';
import { Cluster } from './types';
import { MovieCard } from './movie-card';
import { getMovie } from '../logique/getters';
import { scrollTop } from '../logique/utils';

export class Content extends React.Component<{ clusters: Cluster[], isPopupOpened: boolean, isTrailerContainerVisible: boolean, getDefaultUrl: Function }> {
    componentWillReceiveProps(newProps) {
        if (newProps.clusters.length !== this.props.clusters.length || newProps.clusters[0].title !== this.props.clusters[0].title) {
            scrollTop();
        }
    }
   
    render() {
        return (
            <div id="content">
                <a id="popup-dark-layer-container" href={this.props.getDefaultUrl()}>
                    <div id="popup-dark-layer" className={this.props.isPopupOpened ? 'visible' : ''}></div>
                </a>
                <a id="trailer-dark-layer-container" href={window.location.href.replace('/isTrailerContainerVisible/true', '')}>
                    <div id="trailer-dark-layer" className={this.props.isTrailerContainerVisible ? 'visible' : ''}></div>
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
    <div className='cluster' id={cluster.id}>
        {cluster.title !== '' ? <div className='cluster-title'>{cluster.title}</div> : ''}
        <div className='cluster-content'>
            {cluster.movieIds.map(movieId => (
                <MovieCard key={movieId} movie={getMovie(movieId)}></MovieCard>
            ))}
        </div>
    </div>
)