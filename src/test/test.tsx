import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { MovieCard } from '../components/movie-card';
import { Movie, Schedule } from '../components/types';
import { SearchBar } from '../components/search-bar';
import { DayButtons, ScheduleComponent, PopupHeader } from '../components/popup';
const movie: Movie = {
  "id": '270719',
  "title": "Joel, une enfance en Patagonie",
  "directors": ["Carlos Sorín"],
  "year": 2018,
  "actors": ["Victoria Almeida", "Diego Gentile", "Joel Noguera", "Ana Katz", "Gustavo Daniele"], "genres": ["Drame"], "poster": "270719.jpg", "releaseDate": "Wed Jul 10 2019", "countries": ["argentin"], "summary": "Ne pouvant pas avoir d’enfant, Cecilia et Diego, qui viennent d’emménager dans une petite ville de la Terre de Feu, attendent depuis longtemps de pouvoir adopter. Alors qu'ils n'y croyaient plus, l'arrivée soudaine de Joel, un garçon de 9 ans au passé tourmenté, va bouleverser leur vie et l'équilibre de toute la petite communauté provinciale."
};
const schedule: Schedule = {"cineId":"P7517","movieId":"273484","week":{"dimanche":{"VF":["11:00","16:15"],"VO":["18:45"]},"lundi":{"VF":["11:00","16:15"],"VO":["18:45"]},"mardi":{"VF":["11:00","16:15"],"VO":["18:45"]}}}

type Component = 'MovieCard' | 'SearchBar' | 'DayButtons' | 'Schedules' | 'PopupHeader';
interface TestState {
  component: Component,
}

class Test extends React.Component<{}, TestState> {
  state: TestState = {
    component: null,
  }
  components: Component[] = ['MovieCard', 'SearchBar', 'DayButtons', 'Schedules', 'PopupHeader']
  setComponent = (component: Component) => {
    this.setState({component});
  };

  render() {
    return (
      <div id='container-test'>
        <nav id='menu-test'>
          {this.components
            .map(component => 
            <button 
                className={this.state.component === component ? 'selected' : ''}
                onClick={() => this.setComponent(component)}
            >
            {component} 
            </button>
          )}
        </nav>
        <div id='content-test'>
          {this.state.component === 'MovieCard' && <MovieCard movie={movie}></MovieCard>}
          {this.state.component === 'SearchBar' && <SearchBar setStateAndUpdateHash={null}></SearchBar>}
          {this.state.component === 'DayButtons' && <DayButtons day={0} movieId={"270719"}></DayButtons>}
          {this.state.component === 'Schedules' && <ScheduleComponent schedule={schedule} day={4}></ScheduleComponent>}
          {this.state.component === 'PopupHeader' && <PopupHeader movie={movie} setStateAndUpdateHash={() => ''}></PopupHeader>}
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <Test/>,
  document.getElementById('test')
);