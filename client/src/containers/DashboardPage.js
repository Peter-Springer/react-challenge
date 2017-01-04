import React from 'react';
import Dashboard from '../components/Dashboard.js';
import Auth from '../modules/Auth';

class DashboardPage extends React.Component {
  /**
   * Class constructor.
   */
  constructor(props) {
    super(props);

    this.state = {
      secretData: '',
      email: '',
      name: ''
    };
  }

  /**
   * This method will be executed after initial rendering.
   */
  componentDidMount() {
    const xhr = new XMLHttpRequest();
    xhr.open('get', '/api/dashboard');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    // set the authorization HTTP header
    xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
    xhr.responseType = 'json';
    xhr.addEventListener('load', (res) => {
      if (xhr.status === 200) {
        this.setState({secretData: xhr.response.message,
                       email: localStorage.getItem('email'),
                       name: localStorage.getItem('name')
        })
      }
    });
    xhr.send(Auth.getToken());
  }

  render() {
    return (
      <Dashboard
        secret={this.state.secretData}
        email={this.state.email}
        name={this.state.name}
      />
    )
  }
}

export default DashboardPage;
