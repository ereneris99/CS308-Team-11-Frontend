import React, { useState, useContext } from 'react';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import SongsList from '../components/SongsList'; // Import SongsList component
import { VALIDATOR_REQUIRE } from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
import './AnalysisPage.css';

const AnalysisPage = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedSongs, setLoadedSongs] = useState([]); // State to store the loaded songs
  const [formState, inputHandler] = useForm(
    {
      genre: {
        value: '',
        isValid: false
      }
    },
    false
  );

  const fetchTopRatedSongs = async event => {
    event.preventDefault();
    if (!formState.inputs.genre.isValid) {
      return; // Prevent submission if genre is not valid
    }
  
    try {
      const responseData = await sendRequest(
        'http://localhost:3000/favorite-song-genre',
        'POST',
        JSON.stringify({ genre: formState.inputs.genre.value }),
        {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + auth.token
        }
      );
  
      const favoriteSongsWithUserRating = responseData.favoriteSongs.map(song => {
        // Safely access the user's rating
        const userRatingObj = song.ratings.find(rating => rating.user && rating.user._id.toString() === auth.userId);
        return {
          ...song,
          
        };
      });
      setLoadedSongs(favoriteSongsWithUserRating); // Update the state with the fetched songs
    } catch (err) {
      // Error handling
    }
  };
  

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <form className="analysis-form" onSubmit={fetchTopRatedSongs}>
        {isLoading && <LoadingSpinner asOverlay />}
        <Input
          id="genre"
          element="select"
          label="Genre"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please select a genre."
          onInput={inputHandler}
          options={["Pop", "Rock", "Jazz", "Classical", "Hip Hop", "Electronic", "Country", "Other"]} // Array of genre options
        />
        <Button type="submit" disabled={!formState.inputs.genre.isValid}>
          See Your Top Rated Songs by Genre
        </Button>
      </form>
      {!isLoading && loadedSongs &&(console.log(loadedSongs),    <SongsList items={loadedSongs}/>)}
    </React.Fragment>
  );
};

export default AnalysisPage;