import React, { Component } from 'react';

class LoginForm extends Component {
  state = {
    account: {
      username: '',
      password: ''
    }
  }

  handleSubmit = e => {
    e.preventDefault();
  }

  handleChange = ({ currentTarget: input }) => {
    const account = { ...this.state.account };
    account[input.name] = input.value;
    this.setState({ account });
  }

  render() {
    const { account } = this.state;

    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <div className='form-group'>
            <label htmlFor='username'>Username</label>
            <input
              id='username'
              type='text'
              name='username'
              value={account.username}
              onChange={this.handleChange}
              className='form-control' />
          </div>
          <div className='form-group'>
            <label htmlFor='password'>Password</label>
            <input
              id='password'
              type='text'
              name='password'
              value={account.password}
              onChange={this.handleChange}
              className='form-control' />
          </div>
        </form>
        <button className='btn btn-primary'>Log In</button>
      </div>
    );
  }
}

export default LoginForm;