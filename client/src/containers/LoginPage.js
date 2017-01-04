import React, { Component, PropTypes } from 'react';
import LoginForm from '../components/LoginForm.js';
import Auth from '../modules/Auth';

export default class LoginPage extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      errors: {},
      user: {
        email: '',
        password: '',
      }
    };
    this.processForm = this.processForm.bind(this);
    this.changeUser = this.changeUser.bind(this);
  }
  /**
   * Process the form.
   *
   * @param {object} e - the JavaScript event object
   */
  processForm(e) {
    // prevent default action. in this case, action is the form submission event
    e.preventDefault();

    // create a string for an HTTP body message
    const email = encodeURIComponent(this.state.user.email);
    const password = encodeURIComponent(this.state.user.password);
    const formData = `email=${email}&password=${password}`;

    // create an AJAX request
    const xhr = new XMLHttpRequest();
    xhr.open('post', '/auth/login');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.responseType = 'json';
    xhr.addEventListener('load', (res) => {
      if (xhr.status === 200) {
        const token = res.currentTarget.response.token;
        Auth.authenticateUser(token)
        this.context.router.replace('/dashboard');
        console.log('Valid login form:', {email, password, token});
      } else {
        // failure
        const errors = xhr.response.errors ? xhr.response.errors : {};
        errors.summary = xhr.response.message;

        this.setState({
          errors
        });
        console.error('Login error:', errors.summary);
      }
    });
    xhr.send(formData);
  }

  changeUser(e) {
    const { name, value } = e.target;
    const user = Object.assign({}, this.state.user);
    user[name] = value;
    this.setState({ user });
  }

  render() {
    return (
      <LoginForm
        onSubmit={this.processForm}
        onChange={this.changeUser}
        errors={this.state.errors}
        user={this.state.user}
      />
    );
  }
}

LoginPage.contextTypes = {
  router: PropTypes.object.isRequired
};
