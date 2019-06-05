import * as React from 'react';
import { Movie, Schedule, Cinema } from './types';

export const cinemas: { [id: string]: Cinema } = require('../export/cinemas.json');
export const schedules: { [id: string]: Schedule } = require('../export/schedules.json');

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
const days = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'];

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
                    {indexedScheduleIds[this.props.movie.id].map(scheduleId => (
                        <Schedule
                            key={scheduleId}
                            scheduleId={scheduleId}
                            daySelected={this.props.daySelected}
                        />
                    ))}
                </div>
            </div>
        )
    };
}
const Schedule: React.FunctionComponent<{ scheduleId: string, daySelected: number }> = (props) => {
    const daySchedules = schedules[props.scheduleId].week[days[props.daySelected]]
    const cineId = schedules[props.scheduleId].cineId
    if (daySchedules) {
        return (
            <div className='popup-element'>
                <div className='popup-element-title'>{cinemas[cineId] ? cinemas[cineId].name : cineId}</div>
                {daySchedules.map(daySchedule => (
                    <div className='popup-element-bubble'>{daySchedule}</div>
                ))}
            </div>
        )
    }
    // react is not happy when returning nothing at all
    return null
}

const DayButtons: React.FunctionComponent<{ daySelected: number, movieId: string }> = (props) => (
    <ul className='popup-days'>
        {
            days.map((day, i) =>(
                <a key={i} className={props.daySelected === i ? 'selected popup-days-day' : 'popup-days-day'} href={`#/movie/${props.movieId}/day/${i}`}>{day}</a>
            ))
        }
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