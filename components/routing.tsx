import { BrowserRouter as Router, Route, Link, Redirect, Switch } from "react-router-dom";
import { Movie } from './types';
import * as React from 'react';

export interface RouterConfig {
    movies: Movie[],
    path: string,
    title: string,
  }

  export class Navigation extends React.Component<{ configs: RouterConfig[], fn: Function }> {
    render() {
      return (
        <Router>
            <Link></Link>
        </Router>
      )
    }
  }