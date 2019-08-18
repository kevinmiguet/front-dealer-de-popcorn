import * as React from 'react';
import { Cluster } from './types';
import { MovieCard } from './movie-card';
import { getMovie } from '../logique/getters';
import { scrollTop } from '../logique/utils';
import { useObserver } from 'mobx-react-lite';
import { usePrevious } from '../app';

export const Content: React.FunctionComponent<{ store: any }> = (props) => {
    let { store } = props;

    const prevClusters = usePrevious(store.clusters) || null;

    React.useEffect(() => {
        if (prevClusters &&
            (prevClusters.length !== store.clusters.length || prevClusters[0].title !== store.clusters[0].title)
        ) {
            scrollTop();
        }
    })
    return useObserver(() => (
        <div id="content">
            <div id="popup-dark-layer" onClick={() => store.setStateAndUpdateHash({ movieId: null, day: null, showPopup: null })} className={store.state.showPopup ? 'visible' : ''}></div>
            <div id="trailer-dark-layer" onClick={() => store.setStateAndUpdateHash({ showTrailer: null })} className={store.state.showTrailer ? 'visible' : ''}></div>
            <div className="movie-list" >
                {store.clusters.map(
                    (cluster, clusterIndex) => <ClusterElement key={clusterIndex} cluster={cluster} />
                )}
            </div>
        </div>
    ));

}

const ClusterElement: React.FunctionComponent<{ cluster: Cluster }> = ({ cluster }) => useObserver(() => (
    <div className='cluster' id={cluster.id}>
        {cluster.title !== '' ? <div className='cluster-title'>{cluster.title}</div> : ''}
        <div className='cluster-content'>
            {cluster.movieIds.map(movieId => (
                <MovieCard key={movieId} movie={getMovie(movieId)}></MovieCard>
            ))}
        </div>
    </div>
));