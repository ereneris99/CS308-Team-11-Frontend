import React, { useState, useCallback } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';

import Users from './user/pages/Users';
import NewPlace from './places/pages/NewSong';
import UserSongs from './places/pages/UserSongs';
import UpdatePlace from './places/pages/UpdateSong';
import AnalysisPage from './places/pages/AnalysisPage.js'; // Import the AnalysisPage component
import RecommendationPage from './places/pages/RecommendationPage';
import Albums from './places/pages/Albums';
import Performers from './places/pages/Performers.js';
import Auth from './user/pages/Auth';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import { AuthContext } from './shared/context/auth-context';
import Songs from './places/pages/Songs';
import Welcome from './shared/pages/welcome';


const App = () => {
  const [token, setToken] = useState(false);
  const [userId, setUserId] = useState(false);

  const login = useCallback((uid, token) => {
    setToken(token);
    setUserId(uid);
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
  }, []);

  let routes;

  if (token) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/songs" exact>
          <Songs />
        </Route>
        <Route path="/:userId/places" exact>
          <UserSongs />
        </Route>
        <Route path="/places/new" exact>
          <NewPlace />
        </Route>
        <Route path="/places/:placeId">
          <UpdatePlace />
        </Route>
        <Route path="/analysis"> {/* New route for AnalysisPage */}
          <AnalysisPage />
        </Route>
        <Route path="/recommendations"> {/* New route for RecommendationPage */}
          <RecommendationPage />
        </Route>
        <Route path="/albums"> {/* New route for Albums page */}
          <Albums />
        </Route>
        <Route path="/performers"> {/* New route for Albums page */}
          <Performers />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Welcome/>
        </Route>
        <Route path="/songs" exact>
          <Songs />
        </Route>
        <Route path="/auth">
          <Auth />
        </Route>
        <Redirect to="/auth" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: !!token, token:token ,userId:userId, login: login, logout: logout }}
    >
      <Router>
        <MainNavigation />
        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
