import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Customers from './components/customers';
import Movies from './components/movies';
import MovieForm from './components/movieForm';
import NavBar from './components/common/navBar';
import NotFound from './components/notFound';
import Rentals from './components/rentals';

import LoginForm from './components/loginForm';
import RegisterForm from './components/registerForm';

import 'react-toastify/dist/ReactToastify.css';
import './App.css';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar />
        <main className='container'>
          <Switch>
            <Route path='/login' component={LoginForm} />
            <Route path='/register' component={RegisterForm} />
            <Route path='/movies/:id' component={MovieForm} />
            <Route path='/movies' component={Movies} />
            <Route path='/customers' component={Customers} />
            <Route path='/rentals' component={Rentals} />
            <Route path='/not-found' component={NotFound} />
            <Redirect from='/' to='/movies' exact />
            <Redirect to='/not-found' />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
