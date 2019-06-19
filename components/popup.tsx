import * as React from 'react';
import { Movie, Schedule } from './types';
import { getSchedules, getCinema, getCurrentDay } from '../logique/getters';


const days = ['mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche', 'lundi', 'mardi'];
export const currentDay = getCurrentDay();
export class Popup extends React.Component<{ movie: Movie, isOpen: boolean, daySelected: number }, { popupContentHeight: number }> {
    constructor(props) {
        super(props);
        this.state = {
            popupContentHeight: 0,
        };
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }
    componentWillReceiveProps(newProps) {
        if (newProps.isOpen) {
            document.getElementsByTagName("body")[0].className = 'scrollBlocked';
        } else {
            document.getElementsByTagName("body")[0].removeAttribute('class');
        }
    }
    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
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
            <div id='popup' className={this.props.isOpen ? 'popup-open' : 'popup-close'}>
                <div className='popup-fixed'>
                    <PopupHeader movie={this.props.movie} />
                    <DayButtons daySelected={this.props.daySelected} movieId={this.props.movie.id} />
                </div>
                <div className='popup-scroll' style={popupScrollStyle}>
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
const Schedule: React.FunctionComponent<{ schedule: Schedule, daySelected: number }> = (props) => {
    const selectedDaySchedules = props.schedule.week[days[props.daySelected]]
    const cineId = props.schedule.cineId
    const cinema = getCinema(cineId);
    if (selectedDaySchedules) {
        return (
            <div className='popup-element'>
                <div className='popup-element-title'>{cinema ? cinema.name : cineId}</div>
                {/* display all times for selected day */}
                {selectedDaySchedules.VO && selectedDaySchedules.VO.map(daySchedule => (
                    <div className='popup-element-bubble'>{daySchedule}</div>
                ))}
                {selectedDaySchedules.VF && selectedDaySchedules.VF.map(daySchedule => (
                    <div className='popup-element-bubble'>{daySchedule}</div>
                ))}
            </div>
        )
    }
    else {
        // react is not happy when returning nothing at all
        return null
    }
}

const DayButtons: React.FunctionComponent<{ daySelected: number, movieId: string }> = (props) => (
    <ul className='popup-days'>
        {days.map((day, i) => {
            let dayClass = i < currentDay ? 'popup-days-day past-day' : 'popup-days-day'
        return (
            <a key={i} className={props.daySelected === i ? `selected ${dayClass}` : dayClass} href={`#/movie/${props.movieId}/day/${i}`}>{day}</a>
        )
        })}
    </ul>
)

const PopupHeader: React.FunctionComponent<{ movie: Movie }> = (props) => (
    <div className='popup-header'>
        <img className='movie-poster' src={`./export/posters/${props.movie.poster}`}></img>
        <div className='popup-header-right'>
            <div className='popup-header-right-title'> {props.movie.title}</div>
            <div className='popup-header-right-director'> {props.movie.directors[0]}</div>
        </div>
    </div>
)