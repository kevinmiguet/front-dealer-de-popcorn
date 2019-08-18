import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { useObserver } from 'mobx-react-lite'
import { ClusterGroupTitle } from './components/types';
import { Content } from './components/content';
import { Popup, TrailerContainer } from './components/popup';
import { NavigationBar } from './components/navigation-bar';
import { StoreProvider } from './components/store';


export interface AppState {
  movieId?: string;
  showPopup?: boolean;
  showTrailer?: boolean;
  day?: number;
  cluster?: ClusterGroupTitle;
  searchQuery?: string;
}

export const App: React.FunctionComponent<{}> = (() => {
  return useObserver(() => (
    <StoreProvider>
      <div>
        <NavigationBar />
        <Content />
        <Popup />
        <TrailerContainer />
      </div>
    </StoreProvider>
  ));
})

ReactDOM.render(
  <App />,
  document.getElementById('app')
);