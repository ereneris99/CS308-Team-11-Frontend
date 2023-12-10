import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../shared/context/auth-context';
import { useHttpClient } from '../../shared/hooks/http-hook';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import SongsList from '../components/SongsList';

const RecommendationPage = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [recommendedSongs, setRecommendedSongs] = useState([]);

  useEffect(() => {
    const fetchRecommendedSongs = async () => {
      try {
        const responseData = await sendRequest(
          'http://localhost:3000/recommendation',
          'GET',
          null,
          { Authorization: 'Bearer ' + auth.token }
        );
        setRecommendedSongs(responseData.recommendedSongs);
      } catch (err) {
        console.error(err);
      }
    };

    fetchRecommendedSongs();
  }, [sendRequest, auth.token]);

  const handleSongRated = (updatedSongId, newRating) => {
    setRecommendedSongs(prevSongs =>
      prevSongs.map(song =>
        song._id === updatedSongId ? { ...song, userRating: newRating } : song
      )
    );
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay />}
      {!isLoading && recommendedSongs.length > 0 ? (
        <SongsList
          items={recommendedSongs}
          onRate={handleSongRated}
        />
      ) : (
        !isLoading && <div className="center">No songs to recommend.</div>
      )}
    </React.Fragment>
  );
};

export default RecommendationPage;