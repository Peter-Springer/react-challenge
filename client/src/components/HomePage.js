import React from 'react';
import { Link, IndexLink } from 'react-router';
import { Card, CardTitle, CardActions } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import LoginHeader from './LoginHeader.js'

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name:  localStorage.getItem('name'),
      email: localStorage.getItem('email')
    };
  }

  signOut() {
    this.setState({name: '', email: ''})
    localStorage.clear()
  }

  render() {
    if (localStorage.getItem('name') === null) {
      return (
        <div>
        <LoginHeader/>
        <Card className="container">
          <CardTitle title="Cuttlesoft - React Challenge" subtitle="This is the home page." />
          <CardActions>
          <FlatButton>
          <Link to="/signup">Sign Up</Link>
          </FlatButton>
          <FlatButton>
          <Link to="/login">Login</Link>
          </FlatButton>
          </CardActions>
        </Card>
        </div>
      )
    } else {
      return (
        <div>
          <IndexLink
            className='logged-in-header'
            to="/">
            Cuttlesoft - React Challenge
          </IndexLink>
          <button className='signout' onClick={()=> this.signOut()}>Sign Out</button>
          <section className='user-info-container'>
            <h2>{'name: ' + this.state.name}</h2>
            <h2>{'email: ' + this.state.email}</h2>
          </section>
        </div>
      )
    }
  }
}
export default HomePage;
