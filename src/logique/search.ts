import { Cluster } from '../components/types';
import { clusterGroups, movies, getMovie } from './getters';
/* search by :
// genre
// acteurs
// réalisateur
// titre


com..
suggestions 
    > comédies 
    > 
combien de résultats dans les suggestions ?
qu'est-ce que les gens tapent dans un moteur de recherch de films ?
 "comédies"
 ""
I
*/

export function getSearchQueryClusters(search: string): Cluster[] {
    let result: Cluster[] = [];
    // cluster with all movies containing keyword
    result.push(getMoviesMatchingSearch(search))
    result = result.concat(getClustersMatchingSearch(search));
    result.push(getDirectorsMatchingSearch(search))
    const cleanResult = result.filter(cluster => cluster.movieIds.length > 0);
    return cleanResult.length > 0 ? cleanResult : [{movieIds: [], title: 'Désolé, aucun résultat'}]
}

function getMoviesMatchingSearch(str: string): Cluster {
    const movieIds = Object.keys(movies)
        .filter(movieId => areStringSimilar(str, getMovie(movieId).title))
    return { movieIds, title: '' }
}

function getClustersMatchingSearch(str: string): Cluster[] {
    const clusters = [...clusterGroups.old, ...clusterGroups.recent, ...clusterGroups.retro]
    return clusters.filter(cluster => areStringSimilar(str, cluster.title))
}

function getDirectorsMatchingSearch(str: string): Cluster {
    return Object.keys(movies)
        .filter(movieId => areStringSimilar(str, movies[movieId].directors[0]))
        .reduce((cluster, movieId) => { 
            cluster.movieIds.push(movieId)
            return cluster;
        },{movieIds: [], title: 'Réalisateurs'})
}

function boringify(str: string): string {
    return str.toLowerCase()
    // remove accents, spaces, tirets, 
    // remove double consons and voyels
}

function areStringSimilar(rawSearch: string, rawTag: string): boolean {
    const search = boringify(rawSearch), tag = boringify(rawTag);
    if (!search || !search.length) return false
    return tag.indexOf(search) > -1;
}