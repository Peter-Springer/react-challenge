import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

const Dashboard = ({ secret }) => (
  <Card className='container'>
    <TextField
      name='secret'
      value={secret}
    />
  </Card>
)

export default Dashboard;
