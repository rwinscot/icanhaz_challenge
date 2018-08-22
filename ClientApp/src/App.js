import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Random } from './components/Random';
import { Search } from './components/Search';

export default class App extends Component {
  displayName = App.name;

  render() {
    return (
        <Layout>
            <Route exact path='/' component={Home} />
            <Route path='/home' component={Home} />
            <Route path='/random' component={Random} />
            <Route path='/search' component={Search} />
        </Layout>
    );
  }
}
