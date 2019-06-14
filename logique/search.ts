import { MovieCluster } from '../components/types';
import { moviesClusters, movies } from './getters';
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

export function getSearchResult(search: string): MovieCluster[] {
    let result: MovieCluster[] = [];
    // cluster with all movies containing keyword
    result.push(getMoviesMatchingSearch(search))
    result = result.concat(getClustersMatchingSearch(search));
    result.push(getDirectorsMatchingSearch(search))
    return result;
}

function getMoviesMatchingSearch(str: string): MovieCluster {
    const allMovies = Object.keys(movies).map(movieId => movies[movieId])
    const movieIds = allMovies
        .filter(movie => areStringSimilar(str, movie.title))
        .map(movie => movie.id)
    return { movieIds, title: '' }
}

function getClustersMatchingSearch(str: string): MovieCluster[] {
    const clusters = [...moviesClusters.old, ...moviesClusters.recent, ...moviesClusters.retro]
    return clusters.filter(cluster => areStringSimilar(str, cluster.title))
}

function getDirectorsMatchingSearch(str: string): MovieCluster {
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