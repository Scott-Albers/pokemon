/* eslint-disable max-len, arrow-body-style, no-underscore-dangle, jsx-quotes */

import React from 'react';
import axios from 'axios';
import moment from 'moment';

export default class Pokemon extends React.Component {
  constructor(props) {
    super(props);
    this.create = this.create.bind(this);
    this.state = { errors: [], pokemons: [] };
  }

  componentDidMount() {
    axios.get('/api/pokemons')
    .then((rsp) => {
      this.setState({ pokemons: rsp.data.pokemons });
    });
  }

  componentWillUnmount() {
  }

  create(e) {
    e.preventDefault();
    const name = this.refs.name.value;
    const url = this.refs.url.value;
    axios.post('/api/pokemons', { name, url })
    .then(() => {
      this.setState({ errors: [] });
    })
    .then(() => {
      return axios.get('/api/pokemons');
    })
    .then((rsp) => {
      this.setState({ pokemons: rsp.data.pokemons });
    })
    .catch(err => {
      this.setState({ errors: err });
    });
  }

  render() {
    return (
      <div>
        <div>pokemon token{localStorage.getItem('token')}</div>
        <div className="row">
          <div className="col-xs-3">
            <form>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input ref="name" type="text" className="form-control" id="name" />
              </div>
              <div className="form-group">
                <label htmlFor="url">Url</label>
                <input ref="url" type="text" className="form-control" id="url" />
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

        <div className="row">
          <div className="col-xs-8">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>name</th>
                  <th>picture</th>
                  <th>dateCreated</th>
                </tr>
              </thead>
              <tbody>
                {this.state.pokemons.map(p => (
                  <tr key={p._id}>
                    <td>{p.name}</td>
                    <td><img role='presentation' height='60px' width='60px' src={p.url} /></td>
                    <td>{moment(p.dateCreated).format('MMMM Do YYYY')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="col-xs-4"></div>
        </div>

      </div>
    );
  }
}
