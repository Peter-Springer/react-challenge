import Base from './components/Base.js';
import HomePage from './components/HomePage.js';
import SignUpPage from './containers/SignUpPage.js';
import LoginPage from './containers/LoginPage.js';

const routes = {
  // base component (wrapper for the whole application).
  component: Base,
  childRoutes: [

    {
      path: '/',
      component: HomePage
    },

    {
      path: '/signup',
      component: SignUpPage
    },

    {
      path: '/login',
      component: LoginPage
    }

  ]
};

export default routes;
