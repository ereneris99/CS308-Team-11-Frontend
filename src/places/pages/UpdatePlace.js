import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import Card from '../../shared/components/UIElements/Card';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import './PlaceForm.css';

const DUMMY_PLACES = [
  {
    id: 'p1',
    title: 'Aşkın Olayım',
    artist: 'Simge Sağın',
    album: 'Ben Bazen',
    imageUrl:'https://kultur.istanbul/gorsel/2022/10/simge-roportaj.jpg',
    
  },
  {
    id: 'p1',
    title: 'Aşkın Olayım',
    album: 'Ben Bazen',
    imageUrl:'https://kultur.istanbul/gorsel/2022/10/simge-roportaj.jpg',
    artist: 'Simge Sağın',
    creator: 'u2'
  }
];

const UpdatePlace = () => {
  const [isLoading, setIsLoading] = useState(true);
  const placeId = useParams().placeId;

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: '',
        isValid: false
      },
      artist: {
        value: '',
        isValid: false
      }
    },
    false
  );

  const identifiedPlace = DUMMY_PLACES.find(p => p.id === placeId);

  useEffect(() => {
    if (identifiedPlace) {
      setFormData(
        {
          title: {
            value: identifiedPlace.title,
            isValid: true
          },
          artist: {
            value: identifiedPlace.artist,
            isValid: true
          }
        },
        true
      );
    }
    setIsLoading(false);
  }, [setFormData, identifiedPlace]);

  const placeUpdateSubmitHandler = event => {
    event.preventDefault();
    console.log(formState.inputs);
  };

  if (!identifiedPlace) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find place!</h2>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="center">
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title."
        onInput={inputHandler}
        initialValue={formState.inputs.title.value}
        initialValid={formState.inputs.title.isValid}
      />
      <Input
        id="artist"
        element="textarea"
        label="Artist"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid artist (min. 5 characters)."
        onInput={inputHandler}
        initialValue={formState.inputs.artist.value}
        initialValid={formState.inputs.artist.isValid}
      />
      <Button type="submit" disabled={!formState.isValid}>
        UPDATE SONG
      </Button>
    </form>
  );
};

export default UpdatePlace;
