import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { MovieCard } from '../components/movie-card';
import { Movie, Schedule } from '../components/types';
import { SearchBar } from '../components/search-bar';
import { DayButtons, ScheduleComponent, PopupHeader } from '../components/popup';
import { FilterButton, FilterOption, FilterDropdown } from '../components/filters';
import { useObserver } from 'mobx-react-lite';
import { StoreProvider, useStore } from '../components/store';
const movie: Movie = {
  "id": '270719',
  "title": "Joel, une enfance en Patagonie",
  "directors": ["Carlos Sorín"],
  "year": 2018,
  "actors": ["Victoria Almeida", "Diego Gentile", "Joel Noguera", "Ana Katz", "Gustavo Daniele"], "genres": ["Drame"], "poster": "270719.jpg", "releaseDate": "Wed Jul 10 2019", "countries": ["argentin"], "summary": "Ne pouvant pas avoir d’enfant, Cecilia et Diego, qui viennent d’emménager dans une petite ville de la Terre de Feu, attendent depuis longtemps de pouvoir adopter. Alors qu'ils n'y croyaient plus, l'arrivée soudaine de Joel, un garçon de 9 ans au passé tourmenté, va bouleverser leur vie et l'équilibre de toute la petite communauté provinciale."
};
const schedule: Schedule = { "cineId": "P7517", "movieId": "273484", "week": { "dimanche": { "VF": ["11:00", "16:15"], "VO": ["18:45"] }, "lundi": { "VF": ["11:00", "16:15"], "VO": ["18:45"] }, "mardi": { "VF": ["11:00", "16:15"], "VO": ["18:45"] } } }



const TestWrapper: React.FunctionComponent<{}> = () => {
  return useObserver(() => (
    <StoreProvider>
      <Test />
    </StoreProvider>
  ));
}

const Test: React.FunctionComponent<{}> = () => {
  let [currentComponent, setComponent] = React.useState('FilterDropdown');
  const components: string[] = [
    'MovieCard',
    'SearchBar',
    'DayButtons',
    'Schedules',
    'PopupHeader',
    'FilterButton',
    'FilterOption',
    'FilterDropdown',
  ]
  
  let store = useStore();
  store.state.movieId = movie.id

  return useObserver(() => (
    <div id='container-test'>
      <nav id='menu-test'>
        {components
          .map(component =>
            <button
              className={currentComponent === component ? 'selected' : ''}
              onClick={() => setComponent(component)}
            >
              {component}
            </button>
          )}
      </nav>
      <div id='content-test'>
        {currentComponent === 'MovieCard' && <MovieCard movie={movie}></MovieCard>}
        {currentComponent === 'SearchBar' && <SearchBar></SearchBar>}
        {currentComponent === 'DayButtons' && <DayButtons></DayButtons>}
        {currentComponent === 'Schedules' && <ScheduleComponent schedule={schedule} day={4}></ScheduleComponent>}
        {currentComponent === 'PopupHeader' && <PopupHeader></PopupHeader>}
        {currentComponent === 'FilterButton' && <FilterButton></FilterButton>}
        {currentComponent === 'FilterOption' && <FilterOption value='Comédie' ></FilterOption>}
        {currentComponent === 'FilterDropdown' && <FilterDropdown title='Genre' values={['Comédie', 'Drame', 'Action', 'Thriller', 'Animation', 'Documentaire']}></FilterDropdown>}
      </div>
    </div>
  ));
}


ReactDOM.render(
  <TestWrapper />,
  document.getElementById('test')
);