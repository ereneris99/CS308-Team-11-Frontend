import React ,{useContext} from 'react';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import {
  VALIDATOR_REQUIRE,
  //VALIDATOR_MINLENGTH
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import {AuthContext} from '../../shared/context/auth-context';
import './SongForm.css';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const NewSong = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      title: {
        value: '',
        isValid: false
      },
      album: {
        value: '',
        isValid: false
      },
      performer: {
        value: '',
        isValid: false
      },
      genre: {
        value: '',
        isValid: false // Set initial validity to true for optional field
      },
      rating: {
        value: '',
        isValid: true // Set initial validity to true for optional field
      }
      
    },
    false
  );

  const history = useHistory();

  const placeSubmitHandler = async event => {
    event.preventDefault();
    const isFormValid = formState.inputs.title.isValid &&
                        formState.inputs.album.isValid &&
                        formState.inputs.performer.isValid;

    if (!isFormValid) {
      return; // Prevent form submission if required fields are not valid
    }

    try {
      const songData = {
        title: formState.inputs.title.value,
        performer: formState.inputs.performer.value.split(','), // Splitting by comma for multiple performers
        album: formState.inputs.album.value,
        rating: formState.inputs.rating.value
      };

      await sendRequest(
        'http://localhost:3000/admin/add-song',
        'POST',
        JSON.stringify(songData),
        {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + auth.token
        }
      );
      history.push('/songs');
    } catch (err) {
      // Error handling
    }
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <form className="song-form" onSubmit={placeSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
        <Input
          id="title"
          element="input"
          type="text"
          label="Title"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid title."
          onInput={inputHandler}
        />
        <Input
          id="album"
          element="input"
          label="Album"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid album."
          onInput={inputHandler}
        />
        <Input
          id="performer"
          element="input"
          label="Performer"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid performer."
          onInput={inputHandler}
        />
        <Input
          id="genre"
          element="select"
          label="Genre"
          validators={[VALIDATOR_REQUIRE()]}
          options={["Pop", "Rock", "Jazz", "Classical", "Hip Hop", "Electronic", "Country", "Other"]} // Array of genre options
          onInput={inputHandler}
          placeholder="Select Genre"
        />
        <Input
          id="rating"
          element="select"
          label="Rating"
          validators={[]}
          options={["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]} // Rating options
          onInput={inputHandler}
          placeholder="Select Rating"
        />
        
        <Button type="submit" disabled={!formState.inputs.title.isValid || !formState.inputs.album.isValid || !formState.inputs.performer.isValid || !formState.inputs.genre.isValid}>
          ADD SONG
        </Button>
      </form>
    </React.Fragment>
  );
};

export default NewSong;
