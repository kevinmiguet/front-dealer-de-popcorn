export interface Movie {
    id: string;
    title: string;
    year: number;
    actors: string[];
    directors: string[];
    genres: string[];
    poster: string;
}

export interface Week {
    lundi: string[];
    mardi: string[];
    mercredi: string[];
    jeudi: string[];
    vendredi: string[];
    samedi: string[];
    dimanche: string[];
}

export interface Cinema {
    id: string;
    name: string;
    address: string;
    pos: {
        lat: number;
        lng: number;
    };
}

export interface Schedule {
    movieId: string;
    cineId: string;
    schedule: Week;
}
export interface Database {
    schedules: {[scheduleId: string]: Schedule};
    movies: {[movieId: string]: Movie};
    cinemas: {[cinemaId: string]: Cinema};
}

export interface MovieCluster {
    // type: 'carousel' | 'classic';
    movieIds: string[];
    title: string;
}
export type ClusterTitle = 'recent' | 'retro' | 'old'
export type Clusters = {
    [cluster in ClusterTitle]: MovieCluster[]
}