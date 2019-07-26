import * as React from 'react';
import { Movie, Schedule } from './types';
import { getSchedulesByDistance, getCinema, getCurrentDay, dayNumbers} from '../logique/getters';
import { CloseIcon, DistanceIcon } from './icons';
import { number } from 'prop-types';


const days = ['Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche', 'Lundi', 'Mardi'];
export const currentDay = getCurrentDay();

const distanceToString = (d: number) : string => {
    if (d < 1000) return Math.round(d).toString() + ' m'
    return (d / 1000).toFixed(1) + ' km'
}

export class Popup extends React.Component<{ movie: Movie, isPopupOpened: boolean, daySelected: number, getDefaultUrl: Function }, { popupHeight: number }> {
    constructor(props) {
        super(props);
        this.state = {
            popupContentHeight: 0,
            cinemasByDistance: []
        };
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }
    componentWillReceiveProps(newProps) {
        if (this.props.isPopupOpened !== newProps.isPopupOpened) {
            // scroll to top of popup
            scrollTo('popup', 0, 0)
            // scroll horizontally to current day
            let currentDayElement = document.getElementById(days[currentDay]);
            scrollTo('popup-days', currentDayElement.offsetLeft, 0)
        }
    }
    async componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
        const schedule = await getSchedulesByDistance(this.props.movie.id)
        this.setState({cinemasByDistance: schedule})
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({ popupHeight: window.innerHeight - 54 });
    }

    render() {
        const popupStyle = { height: this.state.popupHeight };
        return (
            <div id='popup' key={'${schedule.movieId}-${schedule.cineId}'} className={this.props.isPopupOpened ? 'popup-open' : 'popup-close'}>
                <div className='popup-fixed'>
                    <PopupHeader movie={this.props.movie} getDefaultUrl={this.props.getDefaultUrl} />
                    <DayButtons daySelected={this.props.daySelected} movieId={this.props.movie.id} />
                </div>
                <div className='popup-schedules'>
                    {getSchedules(this.props.movie.id).map(schedule => (
                        <Schedule
                            key={`${schedule.movieId}-${schedule.cineId}`}
                            schedule={schedule}
                            daySelected={this.props.daySelected}
                        />
                    ))}
                </div>
            </div>
        )
    };
}
const ScheduleComponent: React.FunctionComponent<{ schedule: Schedule, daySelected: number }> = (props) => {
    const selectedDaySchedules = props.schedule.week[days[props.daySelected].toLowerCase()]
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
                            <DistanceIcon/>
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

<<<<<<< HEAD:src/components/popup.tsx
// exported for testing
export const DayButtons: React.FunctionComponent<{ daySelected: number, movieId: string }> = (props) => (
    <ul className='popup-days'>
=======
const DayButtons: React.FunctionComponent<{ daySelected: number, movieId: string }> = (props) => (
    <ul id='popup-days'>
>>>>>>> 1045095... feat(popup): scroll up when opening popup:components/popup.tsx
        {days.map((day, i) => {
            let dayClass = i < currentDay ? 'popup-days-day past-day' : 'popup-days-day'
            return (
                <a
                    id={day}
                    key={i}
                    className={props.daySelected === i ? `selected ${dayClass}` : dayClass}
                    href={`#/movie/${props.movieId}/day/${i}`}
                >
                    <div className='day-name'>{day}</div>
                    <div className='day-number'>{dayNumbers[i]}</div>
                </a>
            )
        })}
    </ul>
)
// exported for testing
export const PopupHeader: React.FunctionComponent<{ movie: Movie, getDefaultUrl: Function }> = (props) => (
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
        <hr/>
        <div className='popup-header-bottom'>
            <h1>Ça raconte quoi ?</h1>
            <div className='popup-header-summary'> {props.movie.summary}</div>
        </div>

        <a id='icon-close' href={props.getDefaultUrl()}><CloseIcon /></a>
    </div>
)