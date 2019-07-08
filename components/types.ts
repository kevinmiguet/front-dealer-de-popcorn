export interface Movie {
    id: string;
    title: string;
    year: number;
    actors: string[];
    directors: string[];
    genres: string[];
    poster?: string;
    releaseDate?: string;
    countries?: string[];
    summary?: string;
}
export interface Cinema {
    id: string;
    name: string;
    url?: string;
    address: string;
    pos: {
        lat: number;
        lng: number;
    };
}
export interface Week {
    [dayname: string]: {
        VO?: string[];
        VF?: string[];
    };
}
export interface Schedule {
    movieId: string;
    cineId: string;
    week: Week;
}

export interface Database {
    schedules: {[scheduleId: string]: Schedule};
    movies: {[movieId: string]: Movie};
    cinemas: {[cinemaId: string]: Cinema};
}

export interface Cluster {
    movieIds: string[];
    title?: string;
    id: string;
}
export type ClusterGroupTitle = 'recent' | 'retro' | 'old';
export const ClusterGroupTitles: ClusterGroupTitle[] = ['old','recent', 'retro']
export type ClusterGroups = {
    [clusterGroup in ClusterGroupTitle]: Cluster[]
}