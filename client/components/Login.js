/* eslint-disable max-len, arrow-body-style, no-underscore-dangle, jsx-quotes */

import React from 'react';
import axios from 'axios';
import { browserHistory } from 'react-router';

export default class Pokemon extends React.Component {
  constructor(props) {
    super(props);
    this.create = this.create.bind(this);
    this.state = { errors: [], token: '' };
  }

  componentWillUnmount() {
  }

  create(e) {
    e.preventDefault();
    const email = this.refs.email.value;
    const password = this.refs.password.value;
    axios.post('/api/login', { email, password })
    .then((rsp) => {
      localStorage.clear();
      localStorage.setItem('token', rsp.data.token);
      browserHistory.push('/pokemon');
    })
    .catch(err => {
      this.setState({ errors: err.message.toString() });
    });
  }

  render() {
    return (
      <div>
        <div>login token {this.state.token}</div>
        <div className="row">
          <div className="col-xs-3">
            <form>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input ref="email" type="text" className="form-control" id="email" />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input ref="password" type="text" className="form-control" id="password" />
              </div>
              <button onClick={this.create} type="submit" className="btn btn-default">Submit</button>
            </form>
          </div>
          <div className="col-xs-3">
            <ul className="bg-danger">
              {this.state.errors}
            </ul>
          </div>
          <div className="col-xs-6">
          </div>
        </div>
      </div>
    );
  }
}
