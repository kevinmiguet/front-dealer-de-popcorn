import * as React from 'react';
import { Schedule } from './types';
import { getSchedulesByDistance, getCinema, getCurrentDay, dayNumbers, getMovie } from '../logique/getters';
import { CloseIcon, DistanceIcon } from './icons';
import { scrollTo } from '../logique/utils';
import { useObserver } from 'mobx-react-lite';
import { usePrevious } from '../app';


const days = ['Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche', 'Lundi', 'Mardi'];
export const currentDay = getCurrentDay();

const distanceToString = (d: number): string => {
    if (d < 1000) return Math.round(d).toString() + ' m'
    return (d / 1000).toFixed(1) + ' km'
}

export const Popup: React.FunctionComponent<{ store: any }> = ((props) => {
    let { store } = props;
    const prevShow = usePrevious(store.state) || null;
    
    React.useEffect(() => {
        if (prevShow && store.state.showPopup !== prevShow.showPopup) {
            scrollTo('popup', 0, 0)
            // scroll horizontally to current day
            if (store.state.movieId) {
                let currentDayElement = document.getElementById(days[currentDay]);
                scrollTo('popup-days', currentDayElement.offsetLeft, 0)
            }
        }
    })

    return useObserver(() => (
        <div id='popup' className={store.state.showPopup ? 'popup-open' : 'popup-close'}>
            {store.state.movieId &&
                <div>
                    <div className='popup-fixed'>
                        <PopupHeader store={store} />
                        <DayButtons day={store.state.day} movieId={store.state.movieId} />
                    </div>
                    <div className='popup-schedules'>
                        {getSchedulesByDistance(store.state.movieId) && getSchedulesByDistance(store.state.movieId).map(schedule => (
                            <ScheduleComponent
                                key={`${schedule.movieId}-${schedule.cineId}`}
                                schedule={schedule}
                                day={store.state.day}
                            />
                        ))}
                    </div>
                </div>
            }
        </div>
    ));
});

export const ScheduleComponent: React.FunctionComponent<{ schedule: Schedule, day: number }> = (props) => {
    const selectedDaySchedules = props.schedule.week[days[props.day].toLowerCase()]
    const cineId = props.schedule.cineId
    const cinema = getCinema(cineId);
    if (selectedDaySchedules) {
        return (
            <div className='popup-element'>
                <div className='popup-element-title-row'>
                    <div className='popup-element-title'>{cinema ? cinema.name : props.schedule.cineId}</div>
                    {
                        cinema && cinema.distance &&
                        <div className='popup-element-distance-row'>
                            <DistanceIcon />
                            <div className='popup-element-distance'>{distanceToString(cinema.distance)}</div>
                        </div>
                    }
                </div>
                {/* display all times for selected day */}
                {selectedDaySchedules.VO && (
                    <div className='version'> VO </div>
                )}
                {selectedDaySchedules.VO && selectedDaySchedules.VO.map(daySchedule => (
                    <div key={daySchedule} className='popup-element-bubble'>{daySchedule}</div>
                ))}
                {selectedDaySchedules.VF && (
                    <div className='version'> VF </div>
                )}
                {selectedDaySchedules.VF && selectedDaySchedules.VF.map(daySchedule => (
                    <div key={daySchedule} className='popup-element-bubble'>{daySchedule}</div>
                ))}
            </div>
        )
    }
    // react is not happy when returning nothing at all
    return null
}

// exported for testing
export const DayButtons: React.FunctionComponent<{ day: number, movieId: string }> = (props) => useObserver(() => (
    <ul id='popup-days'>
        {days.map((day, i) => {
            let dayClass = i < currentDay ? 'popup-days-day past-day' : 'popup-days-day'
            return (
                <a
                    id={day}
                    key={i}
                    className={props.day === i ? `selected ${dayClass}` : dayClass}
                    href={`#/movie/${props.movieId}/day/${i}/showPopup/true`}
                >
                    <div className='day-name'>{day}</div>
                    <div className='day-number'>{dayNumbers[i]}</div>
                </a>
            )
        })}
    </ul>
));
// exported for testing
export const PopupHeader: React.FunctionComponent<{ store: any }> = (props) => {
    const { store } = props;

    return useObserver(() => (
        <div className='popup-header'>
            <div className='popup-header-top'>
                <div className='popup-header-left'>
                    <div className='popup-header-title'> {store.movie.title}</div>
                    <div className='popup-header-director'> {store.movie.directors[0]}</div>
                    {store.movie.trailerId &&
                        <div
                            className='stylish button popup-header-trailerbutton'
                            onClick={() => store.setStateAndUpdateHash({ showTrailer: true })}> voir la bande annonce</div>}
                </div>
                <div className='popup-header-right'>
                    <img className='movie-poster' src={`./export/posters/${store.movie.poster}`}></img>
                </div>
            </div>
            <hr />
            <div className='popup-header-bottom'>
                <h1>Ça raconte quoi ?</h1>
                <div className='popup-header-summary'> {store.movie.summary}</div>
            </div>

            <div id='icon-close' onClick={() => store.setStateAndUpdateHash({ movieId: null, day: null, showPopup: false })}><CloseIcon /></div>
        </div>
    ))
};
export const TrailerContainer: React.FunctionComponent<{ store: any }> = (props) => {
    const { store } = props;
    return useObserver(() => (
        <div className={`trailer-container ${store.state.showTrailer && store.movie.trailerId ? 'visible' : ''}`}>
            {store.state.showTrailer && store.movie.trailerId && <iframe
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${store.movie.trailerId}`}
                frameBorder={0}
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            >
            </iframe >}
        </div>
    ))
}
