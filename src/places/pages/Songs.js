import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../shared/context/auth-context';

import SongsList from '../components/SongsList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';


const Songs = () => {
  const auth = useContext(AuthContext); // Using AuthContext to access the token
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedSongs, setLoadedSongs] = useState();

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const responseData = await sendRequest(
          'http://localhost:3000/songs',
          'GET',
          null,
          { Authorization: 'Bearer ' + auth.token }
        );
        console.log(responseData.songs); // Log to check the structure
        setLoadedSongs(responseData.songs);
      } catch (err) {
        console.error(err);
      }
    };
    fetchSongs();
  }, [sendRequest, auth.token]); // Include auth.token in the dependency array

  const songDeletedHandler = deletedSongId => {
    setLoadedSongs(prevSongs => prevSongs.filter(song => song._id !== deletedSongId));
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedSongs && (
        <SongsList 
          items={loadedSongs} 
          onDeleteSong={songDeletedHandler} 
          showAverageRating={true}
        />
      )}
    </React.Fragment>
  );
};

export default Songs;
