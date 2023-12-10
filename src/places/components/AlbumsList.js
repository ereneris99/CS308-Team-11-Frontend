import React from 'react';
import AlbumItem from './AlbumItem';
import Card from '../../shared/components/UIElements/Card';
import './AlbumsList.css'; // Assuming you have a separate CSS file for albums

const AlbumsList = props => {
  if (props.items.length === 0) {
    return (
      <div className="center">
        <Card>
          <h2>No albums found.</h2>
        </Card>
      </div>
    );
  }

  return (
    <ul className="albums-list">
      {props.items.map(album => (
        <AlbumItem
          key={album._id}
          id={album._id}
          name={album.name}
          performer={album.performer}
          rating={album.ratings}
          //genre={album.genre}
          //releaseDate={album.releaseDate}
          userRating={album.userRating} // Pass the user's specific rating
          onDelete={props.onDeleteAlbum}
          onRate={props.onRate} // Pass the onRate function to each AlbumItem
          showAverageRating={props.showAverageRating}
        />
      ))}
    </ul>
  );
};

export default AlbumsList;