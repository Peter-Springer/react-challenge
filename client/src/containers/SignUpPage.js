import React, { Component, PropTypes } from 'react';
import SignUpForm from '../components/SignUpForm.js';
import LoginHeader from '../components/LoginHeader.js'

export default class SignUpPage extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      errors: {},
      user: {
        name: '',
        password: '',
        admin: false
      },
      checked: false,
    };
    this.processForm = this.processForm.bind(this);
    this.changeUser = this.changeUser.bind(this);
    this.setAdmin = this.setAdmin.bind(this);
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
    const admin = encodeURIComponent(this.state.user.admin);
    const formData = `name=${name}&email=${email}&password=${password}&admin=${admin}`;

    // create an AJAX request
    const xhr = new XMLHttpRequest();
    xhr.open('post', '/auth/signup');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.responseType = 'json';
    xhr.addEventListener('load', (res) => {
      if (xhr.status === 200) {
        console.log(res)
        // set a message
        localStorage.setItem('successMessage', xhr.response.message);
        // make a redirect
        this.context.router.replace('/login');
        console.log('Valid sign up form:', {name, email, password, admin});
      } else {
        // failure
        const errors = xhr.response.errors ? xhr.response.errors : {};
        errors.summary = xhr.response.message;

        this.setState({
          errors
        });
        console.error('Sign up error:', errors.summary);
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

  setAdmin() {
    const user = Object.assign({}, this.state.user)
    if (this.state.checked) {
      user.admin = false;
      this.setState({checked: false, user})
    } else {
      user.admin = true;
      this.setState({checked: true, user})
    }
  }

  render() {
    return (
      <div>
      <LoginHeader/>
      <SignUpForm
        onSubmit={this.processForm}
        onChange={this.changeUser}
        errors={this.state.errors}
        user={this.state.user}
        setAdmin={this.setAdmin}
      />
      </div>
    );
  }
}

SignUpPage.contextTypes = {
  router: PropTypes.object.isRequired
};
