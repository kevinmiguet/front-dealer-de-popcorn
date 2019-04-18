import { MovieCluster } from '../components/types';
import { movies, moviesClusters } from '../app';

function getMovieWithKeywordCluster(str: string): MovieCluster {
    const moviesArray = Object.keys(movies).map(movieId => movies[movieId])
    const movieIds = moviesArray
        .filter(movie => areStringSimilar(str, movie.title))
        .map(movie => movie.id)
    return { movieIds }
}
export function getSearchResult(search: string): MovieCluster[] {
    let result: MovieCluster[] = [];
    // cluster with all movies containing keyword
    result.push(getMovieWithKeywordCluster(search))
    const clusters = [...moviesClusters.old, ...moviesClusters.recent, ...moviesClusters.retro]
    clusters
        .filter(cluster => areStringSimilar(search, cluster.title))
        .forEach(cl => result.push(cl))
        
    return result;
}
function boringify(str: string): string {
    return str.toLowerCase()
    // remove accents, spaces, tirets, 
    // remove double consons and voyels
}
// @TODO: check for substring rather than eql string
function areStringSimilar(_search: string, _tag: string): boolean {
    const search = boringify(_search), tag = boringify(_tag);
    if (!search || !search.length) return false
    if (search === tag) return true;
    // if search is 4 chars longer than tag, discard the tag
    if (search.length - tag.length >= 4) return false;

    return distanceEditionIsLow(search, tag);
}

function distanceEditionIsLow(search: string, tag: string): boolean {
    // for words of 3 letters and less
    let distanceMax = search.length <= 3 ? 1 : 3;
    return distanceEdition(search, tag) < distanceMax;
}

function distanceEdition(search: string, tag: string): number {
    const searchChars = search.split('');
    const tagSplit = tag.split('');
    let distance = 0;
    searchChars.forEach((char, index) => {
        if (char !== tagSplit[index]) {
            distance++;
        }
    })
    return distance;
}