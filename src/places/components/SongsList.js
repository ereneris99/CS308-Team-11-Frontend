import React from 'react';

import SongItem from './SongItem';
import Card from '../../shared/components/UIElements/Card';
import './SongsList.css';

const SongsList = props => {
  if (props.items.length === 0) {
    return (
      <div className="center">
        <Card>
          <h2>No songs found.</h2>
        </Card>
      </div>
    );
  }

  return (
    <ul className="songs-list">
      {props.items.map(place => (
        <SongItem
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