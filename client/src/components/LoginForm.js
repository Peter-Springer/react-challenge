import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

const LoginForm = ({ onSubmit, onChange, user }) => {
  return (
    <Card className="container">
      <form action="/" onSubmit={onSubmit}>
        <div className="Login">
        <TextField
          floatingLabelText="Email"
          name="email"
          onChange={onChange}
          value={user.email}
        />
        <TextField
          floatingLabelText="Password"
          type="password"
          name="password"
          onChange={onChange}
        />
        </div>
        <div className="button-line">
          <RaisedButton type="submit" label="Login" primary />
        </div>
      </form>
    </Card>
  );
}

export default LoginForm;
