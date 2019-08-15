import * as React from 'react';
import { Movie, Schedule } from './types';
import { getSchedulesByDistance, getCinema, getCurrentDay, dayNumbers } from '../logique/getters';
import { CloseIcon, DistanceIcon } from './icons';
import { scrollTo } from '../logique/utils';


const days = ['Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche', 'Lundi', 'Mardi'];
export const currentDay = getCurrentDay();

const distanceToString = (d: number): string => {
    if (d < 1000) return Math.round(d).toString() + ' m'
    return (d / 1000).toFixed(1) + ' km'
}

export class Popup extends React.Component<{ movie: Movie, showPopup: boolean, day: number, setStateAndUpdateHash: Function }, { popupContentHeight: number, cinemasByDistance: any[] }> {
    constructor(props) {
        super(props);
        this.state = {
            popupContentHeight: 0,
            cinemasByDistance: []
        };
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }
    componentWillReceiveProps(newProps) {
        if (this.props.showPopup !== newProps.showPopup) {
            // scroll to top of popup
            scrollTo('popup', 0, 0)
            // scroll horizontally to current day
            if (this.props.movie) {
                let currentDayElement = document.getElementById(days[currentDay]);
                scrollTo('popup-days', currentDayElement.offsetLeft, 0)
            }
        }
    }
    async componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
        if (this.props.movie) {
            const schedule = await getSchedulesByDistance(this.props.movie.id)
            this.setState({ cinemasByDistance: schedule })
        }
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({ popupContentHeight: window.innerHeight - 54 });
    }

    render() {
        const popupStyle = { height: this.state.popupContentHeight };
        return (
            <div id='popup' className={this.props.showPopup ? 'popup-open' : 'popup-close'}>
                {this.props.movie &&
                    <div>
                        <div className='popup-fixed'>
                            <PopupHeader movie={this.props.movie} setStateAndUpdateHash={this.props.setStateAndUpdateHash} />
                            <DayButtons day={this.props.day} movieId={this.props.movie.id} />
                        </div>
                        <div className='popup-schedules'>
                            {getSchedulesByDistance(this.props.movie.id) && getSchedulesByDistance(this.props.movie.id).map(schedule => (
                                <ScheduleComponent
                                    key={`${schedule.movieId}-${schedule.cineId}`}
                                    schedule={schedule}
                                    day={this.props.day}
                                />
                            ))}
                        </div>
                    </div>
                }
            </div>
        );
    };
}

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
export const DayButtons: React.FunctionComponent<{ day: number, movieId: string }> = (props) => (
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
)
// exported for testing
export const PopupHeader: React.FunctionComponent<{ movie: Movie, setStateAndUpdateHash: Function }> = (props) => (
    <div className='popup-header'>
        <div className='popup-header-top'>
            <div className='popup-header-left'>
                <div className='popup-header-title'> {props.movie.title}</div>
                <div className='popup-header-director'> {props.movie.directors[0]}</div>
            </div>
            <div className='popup-header-right'>
                <img className='movie-poster' src={`./export/posters/${props.movie.poster}`}></img>
            </div>
        </div>
        <hr />
        <div className='popup-header-bottom'>
            <h1>Ça raconte quoi ?</h1>
            <div className='popup-header-summary'> {props.movie.summary}</div>
        </div>

        <div id='icon-close' onClick={() => props.setStateAndUpdateHash({ movieId: null, day: null, showPopup: null })}><CloseIcon /></div>
    </div>
)
export const TrailerContainer: React.FunctionComponent<{ showTrailer: boolean, trailerId: string }> = (props) => {
    if (props.showTrailer && props.trailerId) {
        return (
            <div className={`trailer-container ${props.showTrailer ? 'visible' : ''}`}>
                <iframe
                    width="560"
                    height="315"
                    src={`https://www.youtube.com/embed/${props.trailerId}`}
                    frameBorder={0}
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                >
                </iframe >
            </div>)
    } return null;

}
