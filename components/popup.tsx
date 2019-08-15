import * as React from 'react';
import { Movie, Schedule, SetStateAndUpdateHashFn } from './types';
import { getSchedules, getCinema, getCurrentDay, dayNumbers } from '../logique/getters';
import { CloseIcon, StartIcon } from './icons';
import { scrollTo } from '../logique/utils';


const days = ['Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche', 'Lundi', 'Mardi'];
export const currentDay = getCurrentDay();
export class Popup extends React.Component<{ movie: Movie, showPopup: boolean, day: number, setStateAndUpdateHash: SetStateAndUpdateHashFn }, { popupHeight: number }> {
    constructor(props) {
        super(props);
        this.state = {
            popupHeight: 0,
        };
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }
    componentWillReceiveProps(newProps) {
        if (this.props.showPopup !== newProps.showPopup) {
            // scroll to top of popup
            scrollTo('popup', 0, 0)
            // scroll horizontally to current day
            let currentDayElement = document.getElementById(days[currentDay]);
            if (currentDayElement) {
                scrollTo('popup-days', currentDayElement.offsetLeft, 0)
            }
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
        this.setState({ popupHeight: window.innerHeight - 54 });
    }
    render() {
        const popupStyle = { height: this.state.popupHeight };
        return (
            <div id='popup' className={this.props.showPopup ? 'popup-open' : 'popup-close'} style={popupStyle}>
                {this.props.movie && (this.props.day || this.props.day === 0) &&
                <div>
                    <div className='popup-fixed'>
                        <PopupHeader movie={this.props.movie} setStateAndUpdateHash={this.props.setStateAndUpdateHash} />
                        <DayButtons day={this.props.day} movieId={this.props.movie.id}/>
                    </div>
                    <div className='popup-schedules'>
                        {getSchedules(this.props.movie.id).map(schedule => (
                            <Schedule
                                key={`${schedule.movieId}-${schedule.cineId}`}
                                schedule={schedule}
                                day={this.props.day}
                            />
                        ))}
                    </div>
                </div>}
            </div>
        )
    };
}

const PopupHeader: React.FunctionComponent<{ movie: Movie, setStateAndUpdateHash: SetStateAndUpdateHashFn }> = (props) => (
    <div className='popup-header'>
        <div className='popup-header-top'>
            <div className='popup-header-left'>
                <div className='popup-header-title'> {props.movie.title}</div>
                <div className='popup-header-director'> {props.movie.directors[0]}</div>
                { 
                    props.movie.trailerId ?(
                        <a className='popup-header-trailerbutton' href={`${window.location.href}/showTrailer/true`}> 
                        voir la bande annonce 
                        <StartIcon/>
                        </a>
                    ) : ''
                }
                
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
        <div id='icon-close' onClick={() => props.setStateAndUpdateHash({showPopup: null, movieId: null, day: null})}><CloseIcon /></div>
    </div>
)

const DayButtons: React.FunctionComponent<{ day: number, movieId: string }> = (props) => (
    <ul id='popup-days'>
        {days.map((day, i) => {
            let dayClass = i < currentDay ? 'popup-days-day past-day' : 'popup-days-day'
            return (
                <a
                    id={day}
                    key={i}
                    className={props.day === i ? `selected ${dayClass}` : dayClass}
                    href={`#/movieId/${props.movieId}/day/${i}/showPopup/true`}
                >
                    <div className='day-name'>{day}</div>
                    <div className='day-number'>{dayNumbers[i]}</div>
                </a>
            )
        })}
    </ul>
)

const Schedule: React.FunctionComponent<{ schedule: Schedule, day: number }> = (props) => {
    const selectedDaySchedules = props.schedule.week[days[props.day].toLowerCase()]
    const cineId = props.schedule.cineId
    const cinema = getCinema(cineId);
    if (selectedDaySchedules) {
        return (
            <div className='popup-element'>
                <div className='popup-element-title'>{cinema ? cinema.name : cineId}</div>
                {/* display all times for selected day */}
                {selectedDaySchedules.VO && (
                    <div className='version'> VO </div>
                )}
                {selectedDaySchedules.VO && selectedDaySchedules.VO.map(daySchedule => (
                    <div className='popup-element-bubble'>{daySchedule}</div>
                ))}
                {selectedDaySchedules.VF && (
                    <div className='version'> VF </div>
                )}
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

export const TrailerContainer: React.FunctionComponent<{ showTrailer: boolean, trailerId: string}> = (props) => {
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
