import * as React from 'react';
import { Movie, Schedule } from './types';
import { getSchedulesByDistance, getCinema, getCurrentDay} from '../logique/getters';
import { CloseIcon, DistanceIcon } from './icons';
import { number } from 'prop-types';


const days = ['mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche', 'lundi', 'mardi'];
export const currentDay = getCurrentDay();

const distanceToString = (d: number) : string => {
    if (d < 1000) return Math.round(d).toString() + ' m'
    return (d / 1000).toFixed(1) + ' km'
}

export class Popup extends React.Component<{ movie: Movie, isPopupOpened: boolean, daySelected: number, getDefaultUrl: Function }, { popupContentHeight: number, cinemasByDistance: Schedule[] }> {
    constructor(props) {
        super(props);
        this.state = {
            popupContentHeight: 0,
            cinemasByDistance: []
        };
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
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
        this.setState({ popupContentHeight: window.innerHeight - 288 });
    }

    render() {
        const popupScrollStyle = { height: this.state.popupContentHeight };
        return (
            <div id='popup' key={'${schedule.movieId}-${schedule.cineId}'} className={this.props.isPopupOpened ? 'popup-open' : 'popup-close'}>
                <div className='popup-fixed'>
                    <PopupHeader movie={this.props.movie} getDefaultUrl={this.props.getDefaultUrl} />
                    <DayButtons daySelected={this.props.daySelected} movieId={this.props.movie.id} />
                </div>
                <div className='popup-scroll' style={popupScrollStyle}>
                    {
                        getSchedulesByDistance(this.props.movie.id) &&
                        getSchedulesByDistance(this.props.movie.id).map(schedule => (
                            <ScheduleComponent
                                key={`${schedule.movieId}-${schedule.cineId}`}
                                schedule={schedule}
                                daySelected={this.props.daySelected}
                            />  
                        ))
                    }
                </div>
            </div>
        )
    };
}
// exported for testing
export const ScheduleComponent: React.FunctionComponent<{ schedule: Schedule, daySelected: number }> = (props) => {
    const selectedDaySchedules = props.schedule.week[days[props.daySelected]]
    const cine = getCinema(props.schedule.cineId)
    if (selectedDaySchedules) {
        return (
            <div className='popup-element'>
                <div className='popup-element-title-row'>
                    <div className='popup-element-title'>{cine ? cine.name : props.schedule.cineId}</div>
                    { 
                        cine && cine.distance &&
                        <div className='popup-element-distance-row'>
                            <DistanceIcon/>
                            <div className='popup-element-distance'>{distanceToString(cine.distance)}</div>
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
export const DayButtons: React.FunctionComponent<{ daySelected: number, movieId: string }> = (props) => (
    <ul className='popup-days'>
        {days.map((day, i) => {
            let dayClass = i < currentDay ? 'popup-days-day past-day' : 'popup-days-day'
            return (
                <a key={i} className={props.daySelected === i ? `selected ${dayClass}` : dayClass} href={`#/movie/${props.movieId}/day/${i}`}>{day}</a>
            )
        })}
    </ul>
)
// exported for testing
export const PopupHeader: React.FunctionComponent<{ movie: Movie, getDefaultUrl: Function }> = (props) => (
    <div className='popup-header'>
        <img className='movie-poster' src={`./export/posters/${props.movie.poster}`}></img>
        <div className='popup-header-right'>
            <div className='popup-header-right-title'> {props.movie.title}</div>
            <div className='popup-header-right-director'> {props.movie.directors[0]}</div>
            <div className='popup-header-right-summary'> {props.movie.summary}</div>
        </div>
        <a id='icon-close' href={props.getDefaultUrl()}>
            <CloseIcon/>
        </a>
    </div>
)