import React, { useEffect, useState, useContext } from 'react';

import AlbumsList from '../components/AlbumsList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';

const Albums = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedAlbums, setLoadedAlbums] = useState();

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const responseData = await sendRequest(
          'http://localhost:3000/getalbums', // Correct URL for fetching albums
          'GET',
          null,
          { Authorization: 'Bearer ' + auth.token }
        );
        setLoadedAlbums(responseData.albums);
      } catch (err) {
        console.error(err);
      }
    };
    fetchAlbums();
  }, [sendRequest, auth.token]);

  const albumDeletedHandler = deletedAlbumId => {
    setLoadedAlbums(prevAlbums => prevAlbums.filter(album => album._id !== deletedAlbumId));
  };

  const updateAlbumRating = async () => {
    try {
      const responseData = await sendRequest(
        'http://localhost:3000/getalbums',
        'GET',
        null,
        { Authorization: 'Bearer ' + auth.token }
      );
      setLoadedAlbums(responseData.albums);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedAlbums && (
        <AlbumsList 
          items={loadedAlbums} 
          onDeleteAlbum={albumDeletedHandler} 
          onRate={updateAlbumRating}
          showAverageRating={true}
        />
      )}
    </React.Fragment>
  );
};

export default Albums;