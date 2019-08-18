import { createContext } from 'react'
import { decorate, observable, action } from 'mobx'
import { AppState } from '../app';
import { isLegitMovieId } from '../logique/getters';
import { ClusterGroupTitles } from './types';
import { useLocalStore } from 'mobx-react-lite';

export function getHashFromState(state: AppState): string {
    const hash = Object.keys(state)
        .filter(attribute => attribute !== 'clusters' && state[attribute])
        .map(attribute => `${attribute}/${state[attribute]}`)
        .join('/');
    return `/${hash}`;
}

export function getStateFromHash(hash: string): AppState {
    const args = hash.split('/');
    let newState: AppState = {};
    let i = 1; // first one is always #
    newState.showPopup = false; // popup is closed by default
    newState.showTrailer = false; // trailer container is hidden by default
    while (i < args.length) {
      let arg = args[i];
      let argValue = decodeURIComponent(args[i + 1]);
  
      if (arg === 'movieId') {
        let movieId = argValue;;
        // if it's not a legit Id, just don't treat this argument
        if (!isLegitMovieId(movieId)) {
          i += 2;
          continue;
        }
        newState.movieId = movieId;
        i += 2;
        continue;
      }
  
      else if (arg === 'day') {
        let day = parseInt(argValue, 10);
        const isLegitDay = day > -1 && day < 7;
        newState.day = isLegitDay ? day : 0;
        i += 2;
        continue
      }
  
      else if (arg === 'cluster') {
        // set 'recent' if argValue is not a ClusterGroupTitle
        const isClusterGroupTitle = ClusterGroupTitles.indexOf(argValue as any) >= 0;
        let clusterName: any = isClusterGroupTitle ? argValue : 'recent';
        newState.cluster = clusterName;
        i += 2;
        continue;
      }
      else if (arg === 'showTrailer') {
        newState.showTrailer = argValue === 'true' ? true : false;
        i += 2;
        continue;
      }
      else if (arg === 'showPopup') {
        newState.showPopup = argValue === 'true' ? true : false;
        i += 2;
        continue;
      }
      else if (arg === 'searchQuery') {
        newState.searchQuery = argValue;
        // this can happen if the search query was cleaned by another button
        // or if the user just landed on the page with a search query in url
        const searchField: any = document.getElementById('search-bar-input');
        if (searchField && !argValue) {
          searchField.value = '';
        }
        i += 2;
        continue;
      }
      i++;
    }
    return newState
}