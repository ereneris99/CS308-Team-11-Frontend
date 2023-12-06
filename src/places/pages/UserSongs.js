import React from 'react';
import { useParams } from 'react-router-dom';

import SongsList from '../components/SongsList';

const DUMMY_PLACES = [
  {
    id: 'p1',
    title: 'Aşkın Olayım',
    album: 'Ben Bazen',
    imageUrl:'https://kultur.istanbul/gorsel/2022/10/simge-roportaj.jpg',
    artist: 'Simge Sağın',

    creator: 'u1'
  },
  {
    id: 'p2',
    title: 'Freed From Desire',
    album: 'Come into My Life',
    imageUrl:'https://lastfm.freetls.fastly.net/i/u/ar0/37dddef1a3b06da9689cadb5421f2f7b.jpg',
    artist: 'Gala',

    creator: 'u1',
  },
  {
    id: 'p2',
    title: 'Freed From Desire',
    album: 'Come into My Life',
    imageUrl:'https://lastfm.freetls.fastly.net/i/u/ar0/37dddef1a3b06da9689cadb5421f2f7b.jpg',
    artist: 'Gala',

    creator: 'u2',
  }
];

const UserSongs = () => {
  const userId = useParams().userId;
  const loadedPlaces = DUMMY_PLACES.filter(place => place.creator === userId);
  return <SongsList items={loadedPlaces} />;
};

export default UserSongs;
