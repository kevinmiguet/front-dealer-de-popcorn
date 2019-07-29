import { Schedule, Cinema, Movie, ClusterGroups } from '../components/types';
import { evaluateDistance, getCurrentPositionAsync } from './utils'
const rawCinemas: { [id: string]: Cinema } = require('../export/cinemas.json');
const schedules: { [id: string]: Schedule } = require('../export/schedules.json');
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
    console.log('adding cine ' + schedule.cineId)
    _indexedScheduleIds[schedule.cineId].push(scheduleId);
    _indexedScheduleIds[schedule.movieId].push(scheduleId);
    return _indexedScheduleIds;
}, {});

//
// Cinemas
//
// Add distance from current position to each cinema

export interface FrontendCinema extends Cinema{
    distance: number
}
interface FrontendCineDictionary {
    [id: string]: FrontendCinema
}

const cinemaIds = Object.keys(rawCinemas)
let indexedCineWithDistanceDictionary: FrontendCineDictionary = null
export async function initIndexedCineWithDistanceDictionary() {
    indexedCineWithDistanceDictionary = {}
    const currentPosition = await getCurrentPositionAsync()
    cinemaIds.map((cineId: string) => {
        const cine = rawCinemas[cineId]
        indexedCineWithDistanceDictionary[cineId] = {} as FrontendCinema
        Object.assign(indexedCineWithDistanceDictionary[cineId], cine)
        try {
            const d = evaluateDistance(cine.pos.lat, 
                cine.pos.lng, 
                currentPosition.coords.latitude,
                currentPosition.coords.longitude)
            indexedCineWithDistanceDictionary[cineId].distance = d
        } catch (err) {
            console.error('error in initIndexedCineWithDistanceDictionary: ', err)
        }
    })
}

// takes a cinema or movie Id and returns their schedules
export function getSchedules(id: string): Schedule[] {
    return indexedScheduleIds[id].map(scId => schedules[scId])
}

// takes a cinema or movie Id and returns their schedules
export function getSchedulesByDistance(id: string): Schedule[] {
    const s = indexedScheduleIds[id].map(scId => schedules[scId]).sort((s1, s2) => {
        const cine1 = indexedCineWithDistanceDictionary[s1.cineId]
        const cine2 = indexedCineWithDistanceDictionary[s2.cineId]
        return cine1.distance - cine2.distance
    })
    return s
}

//
// Cinema
//

export function getCinema(id: string) {
    const cine = indexedCineWithDistanceDictionary[id]
    return cine
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