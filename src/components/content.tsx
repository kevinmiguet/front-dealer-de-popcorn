import * as React from 'react';
import { Cluster, SetStateAndUpdateHashFn } from './types';
import { MovieCard } from './movie-card';
import { getMovie } from '../logique/getters';
import { scrollTop } from '../logique/utils';

export class Content extends React.Component<{ clusters: Cluster[], showPopup: boolean, showTrailer: boolean, setStateAndUpdateHash: SetStateAndUpdateHashFn }> {
    componentWillReceiveProps(newProps) {
        if (newProps.clusters.length !== this.props.clusters.length || newProps.clusters[0].title !== this.props.clusters[0].title) {
            scrollTop();
        }
    }

    render() {
        return (
            <div id="content">
                <div id="popup-dark-layer" onClick={() => this.props.setStateAndUpdateHash({ movieId: null, day: null, showPopup: null })} className={this.props.showPopup ? 'visible' : ''}></div>
                <div id="trailer-dark-layer" onClick={() => this.props.setStateAndUpdateHash({ showTrailer: null })} className={this.props.showTrailer ? 'visible' : ''}></div>
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