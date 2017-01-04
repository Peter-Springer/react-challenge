import Base from './components/Base.js';
import HomePage from './components/HomePage.js';
import SignUpPage from './containers/SignUpPage.js';
import LoginPage from './containers/LoginPage.js';
import DashboardPage from './containers/DashboardPage.js';
import Auth from './modules/Auth';

const routes = {
  // base component (wrapper for the whole application).
  component: Base,
  childRoutes: [

    {
      path: '/',
      component: HomePage
    },

    {
      path: '/dashboard',
      component: DashboardPage
    },

    {
      path: '/signup',
      component: SignUpPage
    },

    {
      path: '/login',
      component: LoginPage
    },

    {
      path: '/logout',
      onEnter: (nextState, replace) => {
        Auth.deauthenticateUser();

        // change the current URL to /
        replace('/');
      }
    }
  ]
};

export default routes;
