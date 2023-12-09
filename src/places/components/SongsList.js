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
        title={song.title}
        album={song.album}
        performer={song.performer}
        rating={song.ratings}
        userRating={song.userRating} // Pass the user's specific rating
        genre={song.genre}
        creatorId={song.creator}
        onDelete={props.onDeleteSong}
        onLikeToggle={props.onLikeToggle}
        onRate={props.onRate} // Pass the onRate function to each SongItem
        showAverageRating={props.showAverageRating}
        showUserRating={props.showUserRating} // Add this to control the display of average rating
        />
      ))}
    </ul>
  );
};

export default SongsList;