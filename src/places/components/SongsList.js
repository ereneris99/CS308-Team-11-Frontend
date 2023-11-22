import React from 'react';

import PlaceItem from './PlaceItem';
import Card from '../../shared/components/UIElements/Card';
import './SongsList.css';

const SongsList = props => {
  if (props.items.length === 0) {
    return (
      <div className="center">
        <Card>
          <h2>No users found.</h2>
        </Card>
      </div>
    );
  }

  return (
    <ul className="users-list">
      {props.items.map(place => (
        <PlaceItem
        key={place.id}
        id={place.id}
        image={place.imageUrl}
        title={place.title}
        album={place.album}
        artist={place.artist}
        creatorId={place.creator}
        coordinates={place.location}
        />
      ))}
    </ul>
  );
};

export default SongsList;