import React, { useEffect, useState } from 'react';

import SongsList from '../components/SongsList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';

const Songs = () => {
  const {isLoading,error,sendRequest,clearError} = useHttpClient();
  const [loadedSongs, setLoadedSongs] = useState();

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const responseData = await sendRequest('http://localhost:3000/songs');

        setLoadedSongs(responseData.songs);
      } catch (err) {}
    };
    fetchSongs();
  }, [sendRequest]);

  const songDeletedHandler = deletedSongId => {
    setLoadedSongs(prevSongs => prevSongs.filter(song => song._id !== deletedSongId)
    );
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedSongs && <SongsList items={loadedSongs} onDeleteSong = {songDeletedHandler} />}
    </React.Fragment>
  );
};

export default Songs;

