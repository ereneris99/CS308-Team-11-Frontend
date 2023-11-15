import React from "react";

import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
 
import Users from "./users/pages/Users";

import NewSong from "./songs/pages/NewSong";

import UserSongs from "./songs/pages/UserSongs";

import MainNavigation from "./shared/components/Navigation/MainNavigation";
 
const App = () => {
  return (
   <Router>
    <MainNavigation />
    <main>
      <Routes>
        <Route path="/" element={<Users/>}/>
        <Route path="/:userID/songs" element={<UserSongs/>}/>
        <Route path="/songs/new" element={<NewSong/>}/>
      </Routes>
     </main>
   </Router>
  );
};
 
export default App;