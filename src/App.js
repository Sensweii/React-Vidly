import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import auth from './services/authService';

import Customers from './components/customers';
import Logout from './components/logout';
import Movies from './components/movies';
import MovieForm from './components/movieForm';
import NavBar from './components/common/navBar';
import NotFound from './components/notFound';
import ProtectedRoute from './components/common/protectedRoute';
import Rentals from './components/rentals';

import LoginForm from './components/loginForm';
import RegisterForm from './components/registerForm';

import 'react-toastify/dist/ReactToastify.css';
import './App.css';

class App extends Component {
  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;

    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar user={user} />
        <main className='container'>
          <Switch>
            <Route path='/login' component={LoginForm} />
            <Route path='/logout' component={Logout} />
            <Route path='/register' component={RegisterForm} />
            <ProtectedRoute path='/movies/:id' component={MovieForm} />
            <Route path='/movies'
              render={props => <Movies {...props} user={user} />} />
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
