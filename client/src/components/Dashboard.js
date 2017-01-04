import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

const Dashboard = ({ secret, email, name }) => (
  <Card className='container'>
    <h2>{name}</h2>
    <h2>{email}</h2>
    <h2>{secret}</h2>
  </Card>
)

export default Dashboard;
