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

const NewSong = () => {
  const auth = useContext(AuthContext);
  const {isLoading,error,sendRequest,clearError} = useHttpClient();
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
      artist: {
        value: '',
        isValid: false
      },
      rating: {
        value: '',
        isValid: false
      }
    },
    false
  );

  const placeSubmitHandler = async event => {
    event.preventDefault();
    try{await sendRequest('http://localhost:3000/add-song','POST',JSON.stringify({
      title: formState.inputs.title.value,
      album: formState.inputs.album.value,
      artist: formState.inputs.artist.value,
      rating: formState.inputs.rating.value,
      //creator: auth.userId
    }),{Authorization:'Bearer ' + auth.token }
    );
    }
    //redirect user to a different page
   catch(err){} 
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError}/>
    <form className="song-form" onSubmit={placeSubmitHandler}>
      {isLoading && <LoadingSpinner asOverlay/>}
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
        id="artist"
        element="input"
        label="Artist"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid Artist."
        onInput={inputHandler}
      />
      <Input
        id="rating"
        element="select"
        label="Rating"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please select a rating."
        onInput={inputHandler}
    /> 

      <Button type="submit" disabled={!formState.isValid}>
        ADD SONG
      </Button>
    </form>
    </React.Fragment>
  );
};

export default NewSong;
