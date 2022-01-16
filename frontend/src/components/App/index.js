import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Navigation from '../Navigation';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import HomePage from '../Home';
import AccountPage from '../Account';
import AdminPage from '../Admin';
import ProfilePage from '../Profile';
import AvatarPage from '../Avatar';
import Dashboard from '../Dashboard';
// import Tips from '../Tips';
import * as ROUTES from '../../constants/routes';
import { withAuthentication } from '../Session';
import {DragVerseTheme} from '../../styles/index';

const App = (props) => {
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    const currentUser = props?.firebase?.currentUser;
    setCurrentUser(currentUser);
  }, [props?.firebase?.currentUser]);
  return (
    <Router {...props}>
      <div style={DragVerseTheme}>
        {console.log(props)}
        <Navigation/>
        {true ? (
          <>
            <Route exact path={ROUTES.LANDING} component={Dashboard} />
            <Route exact path={ROUTES.HOME} component={ProfilePage} />
            <Route exact path={ROUTES.AVATAR} component={AvatarPage} />
            {/* <Route exact path={ROUTES.TIPS} component={Tips} /> */}
            <Route exact path={ROUTES.SIGN_UP} component={SignUpPage} />
            <Route exact path={ROUTES.SIGN_IN} component={SignInPage} />
            <Route
                exact
              path={ROUTES.PASSWORD_FORGET}
              component={PasswordForgetPage}
            />
          </>
        ) : (
          <>
            <Route exact path={ROUTES.SIGN_UP} component={SignUpPage} />
            <Redirect to="/signup" />
          </>
        )}
      </div>
    </Router>
  );
}

export default withAuthentication(App);
