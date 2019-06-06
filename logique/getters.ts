import { Schedule, Cinema, Movie, Clusters } from '../components/types';
export const cinemas: { [id: string]: Cinema } = require('../export/cinemas.json');
export const schedules: { [id: string]: Schedule } = require('../export/schedules.json');
export const movies: { [id: string]: Movie } = require('../export/movies.json');
export const moviesClusters: Clusters = require('../export/clusters.json');

//
// Schedules
//

interface IndexedScheduleIds {
    [id: string]: string[];
};
const scheduleIds = Object.keys(schedules);
const indexedScheduleIds: IndexedScheduleIds = scheduleIds.reduce((_indexedScheduleIds, scheduleId) => {
    const schedule = schedules[scheduleId];
    if (!_indexedScheduleIds[schedule.cineId]) {
        _indexedScheduleIds[schedule.cineId] = [];
    }
    if (!_indexedScheduleIds[schedule.movieId]) {
        _indexedScheduleIds[schedule.movieId] = [];
    }
    _indexedScheduleIds[schedule.cineId].push(scheduleId);
    _indexedScheduleIds[schedule.movieId].push(scheduleId);
    return _indexedScheduleIds;
}, {});


// takes a cinema or movie Id and returns their schedules
export function getSchedules(id: string): Schedule[] {
    return indexedScheduleIds[id].map(scId => schedules[scId])
}

//
// Cinema
//

export function getCinema(id: string) {
    return cinemas[id];
}

//
// Movie
//
export function getMovie(id: string) {
    return movies[id];
}

export function isLegitMovieId(movieId: any) {
    return Object.keys(movies).indexOf(movieId) > 0
} 

//
// Cluster
// 

export function getMovieCluster(clusterName: string) {
    return moviesClusters[clusterName]
}