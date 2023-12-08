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
      {props.items.map(song => (
        <SongItem
          key={song._id}
          id={song._id}
          //image={song.imageUrl}
          title={song.title}
          album={song.album}
          performer={song.performer}
          rating={song.rating}
          genre={song.genre}
          creatorId={song.creator}
          onDelete={props.onDeleteSong} // Assuming onDeleteSong is a prop passed to SongsList
          onLikeToggle={props.onLikeToggle}
        />
      ))}
    </ul>
  );
};

export default SongsList;