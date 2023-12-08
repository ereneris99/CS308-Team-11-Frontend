import React, { useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';

import SongsList from '../components/SongsList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

import { useHttpClient } from '../../shared/hooks/http-hook';
import {AuthContext} from '../../shared/context/auth-context';
import { useContext } from 'react';


const UserSongs = () => {
const auth = useContext(AuthContext);
const [loadedSongs, setLoadedSongs] = useState();
const {isLoading,error,sendRequest,clearError}=useHttpClient();
const updateSongsAfterLikeToggle = (songId) => {
  setLoadedSongs(prevSongs => 
    prevSongs.filter(song => song._id !== songId)
  );
};

  const userId = useParams().userId;

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:3000/list-likesong`,
          'GET',
          null, // No body for GET request
          {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + auth.token // Include the auth token
          }
        );
        setLoadedSongs(responseData.likesongs); // Update to 'likesongs'
      } catch (err) {
        // Handle errors if necessary
      }
    };
    fetchSongs();
  }, [sendRequest, userId, auth.token]);

 
  return <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (<div 
        className="center"><LoadingSpinner />
      </div>
      )}
      {!isLoading && loadedSongs && <SongsList items={loadedSongs} onLikeToggle={updateSongsAfterLikeToggle}  />}
    </React.Fragment>;
};

export default UserSongs;
