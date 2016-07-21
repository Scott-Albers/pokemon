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
    axios.post('/api/register', { email, password })
    .then(() => {
      browserHistory.push('/login');
      // this.setState({ token: rsp.data.token });
    })
    .catch(err => {
      console.log('error', err);
      this.setState({ errors: JSON.parse(err.response.data).messages });
    });
  }

  render() {
    return (
      <div>
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
              {this.state.errors.map((e, i) => <li key={i}>{e}</li>)}
            </ul>
          </div>
          <div className="col-xs-6">
          </div>
        </div>
      </div>
    );
  }
}
