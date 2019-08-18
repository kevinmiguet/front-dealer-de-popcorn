import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { useObserver } from 'mobx-react-lite'
import { Content } from './components/content';
import { Popup, TrailerContainer } from './components/popup';
import { NavigationBar } from './components/navigation-bar';
import { StoreProvider } from './components/store';


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