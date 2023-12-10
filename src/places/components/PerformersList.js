import React from 'react';
import PerformerItem from './PerformerItem';
import Card from '../../shared/components/UIElements/Card';
import './PerformersList.css'; // Assuming you have a separate CSS file for performers

const PerformersList = props => {
  if (props.items.length === 0) {
    return (
      <div className="center">
        <Card>
          <h2>No performers found.</h2>
        </Card>
      </div>
    );
  }

  return (
    <ul className="performers-list">
      {props.items.map(performer => (
        <PerformerItem
          key={performer._id}
          id={performer._id}
          name={performer.name}
          //genre={performer.genre}
          rating={performer.ratings}
          userRating={performer.userRating} // Pass the user's specific rating
          onDelete={props.onDeletePerformer}
          onRate={props.onRate} // Pass the onRate function to each PerformerItem
          showAverageRating={props.showAverageRating}
        />
      ))}
    </ul>
  );
};

export default PerformersList;