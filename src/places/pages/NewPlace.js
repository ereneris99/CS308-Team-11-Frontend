import React from 'react';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import {
  VALIDATOR_REQUIRE,
  //VALIDATOR_MINLENGTH
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import './PlaceForm.css';

const NewPlace = () => {
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

  const placeSubmitHandler = event => {
    event.preventDefault();
    console.log(formState.inputs); // send this to the backend!
  };

  return (
    <form className="place-form" onSubmit={placeSubmitHandler}>
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
  );
};

export default NewPlace;
