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
const days = ['', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'];

export class Popup extends React.Component<{ movie: Movie, isOpen: boolean, daySelected: number }, {popupContentHeight: number} > {
    constructor(props) {
        super(props);
        this.state = { 
            popupContentHeight: 0,
        };
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }
    componentWillReceiveProps(newProps){
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
        const popupElementsStyle = {height: this.state.popupContentHeight};
        return (
            <div id='popup' className={this.props.isOpen ? 'popup-open' : 'popup-close'}>
                <div className='popup-fixed'>
                    <div className='popup-header'>
                        <img className='movie-poster' src={`./export/posters/${this.props.movie.poster}`}></img>
                        <div className='popup-header-right'>
                            <div className='popup-header-right-title'> {this.props.movie.title}</div>
                            <div className='popup-header-right-director'> {this.props.movie.directors[0]}</div>
                        </div>
                    </div>
                    <DayButtons daySelected={this.props.daySelected} movieId={this.props.movie.id} />
                </div>
                <div className='popup-elements' style={popupElementsStyle}>
                    {indexedScheduleIds[this.props.movie.id].map(scheduleId => (
                        <Schedule
                            key={scheduleId}
                            cineId={schedules[scheduleId].cineId}
                            schedules={schedules[scheduleId].schedule[days[this.props.daySelected]]}
                        />
                    ))}
                </div>
            </div>
        )
    };
}
const Schedule: React.FunctionComponent<{ cineId: string, schedules: string[] }> = (props) => {
    return props.schedules ? (
        <div className='popup-element'>
            <div className='popup-element-title'>{cinemas[props.cineId] ? cinemas[props.cineId].name : props.cineId}</div>
            {props.schedules.map(schedule => (
                <div className='popup-element-bubble'>{schedule}</div>
            ))}
        </div>
    ): null
}

const DayButtons: React.FunctionComponent<{ daySelected: number, movieId: string }> = (props) => (
    <ul className='popup-days'>
        <a className={props.daySelected === 1 ? 'selected popup-days-day' : 'popup-days-day'} href={`#/movie/${props.movieId}/day/${1}`}>Lundi</a>
        <a className={props.daySelected === 2 ? 'selected popup-days-day' : 'popup-days-day'} href={`#/movie/${props.movieId}/day/${2}`}>Mardi</a>
        <a className={props.daySelected === 3 ? 'selected popup-days-day' : 'popup-days-day'} href={`#/movie/${props.movieId}/day/${3}`}>Mercredi</a>
        <a className={props.daySelected === 4 ? 'selected popup-days-day' : 'popup-days-day'} href={`#/movie/${props.movieId}/day/${4}`}>Jeudi</a>
        <a className={props.daySelected === 5 ? 'selected popup-days-day' : 'popup-days-day'} href={`#/movie/${props.movieId}/day/${5}`}>Vendredi</a>
        <a className={props.daySelected === 6 ? 'selected popup-days-day' : 'popup-days-day'} href={`#/movie/${props.movieId}/day/${6}`}>Samedi</a>
        <a className={props.daySelected === 7 ? 'selected popup-days-day' : 'popup-days-day'} href={`#/movie/${props.movieId}/day/${7}`}>Dimanche</a>
    </ul>
)