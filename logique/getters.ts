import { Schedule, Cinema, Movie, ClusterGroups } from '../components/types';
export const cinemas: { [id: string]: Cinema } = require('../export/cinemas.json');
export const schedules: { [id: string]: Schedule } = require('../export/schedules.json');
export const movies: { [id: string]: Movie } = require('../export/movies.json');
export const clusterGroups: ClusterGroups = require('../export/clusters.json');

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

export function getClusterGroup(clusterGroupName: string) {
    return clusterGroups[clusterGroupName]
}


export function getCurrentDay(): number {
    const normalPeopleWeekToCinemaWeek = {
        0:4, // Dimanche: cinquième jour de semaine cinéma (qui commence mercredi)
        1:5, // Lundi: sixième jour de semaine cinéma (qui commence mercredi)
        2:6, // etc...
        3:0,
        4:1,
        5:2,
        6:3,
    };
    const normalPeopleCurrentDay =  new Date().getDay();
    return normalPeopleWeekToCinemaWeek[normalPeopleCurrentDay];
}