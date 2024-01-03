import React from 'react';
import './welcome.css';
import { useHistory } from 'react-router-dom';

const Welcome = () => {
  const history = useHistory();

  const handleLoginRedirect = () => {
    history.push('/login'); // Replace '/login' with your login route
  };
  return (
    <div className="welcome-background">
      <div className="welcome">
        <h1>Welcome to SoundArena!</h1>
        <p>
          Explore a vast collection of songs, albums, and artists. 
          Discover new music, rate your favorites, and join our community.
        </p>  
        <div>
        <button className="glow-on-hover" type="button" onClick={handleLoginRedirect}>LOG IN
      </button>
        </div>
      </div>
    </div>
  );
};

export default Welcome;



