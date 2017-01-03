import React, { Component } from 'react';
import SignUpForm from '../components/SignUpForm.js';

export default class SignUpPage extends Component {
  constructor() {
    super();
    this.state = {
      errors: {},
      user: {
        name: '',
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
    const name = encodeURIComponent(this.state.user.name);
    const email = encodeURIComponent(this.state.user.email);
    const password = encodeURIComponent(this.state.user.password);
    const formData = `name=${name}&email=${email}&password=${password}`;

    // create an AJAX request
    const xhr = new XMLHttpRequest();
    xhr.open('post', '/auth/signup');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        // success
        console.log('The form is valid');
      } else {
        // failure
        const errors = xhr.response.errors ? xhr.response.errors : {};
        errors.summary = xhr.response.message;

        console.log(errors.summary);
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
      <SignUpForm
        onSubmit={this.processForm}
        onChange={this.changeUser}
        errors={this.state.errors}
        user={this.state.user}
      />
    );
  }
}
