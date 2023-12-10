import React, { useState, useContext } from 'react';
import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/FormElements/Button';
import Modal from '../../shared/components/UIElements/Modal';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { AuthContext } from '../../shared/context/auth-context';
import { useHttpClient } from '../../shared/hooks/http-hook';
import './PerformerItem.css';

const PerformerItem = props => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const auth = useContext(AuthContext);
  //const [isLiked, setIsLiked] = useState(props.isInitiallyLiked);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const showDeleteWarningHandler = () => setShowConfirmModal(true);
  const cancelDeleteHandler = () => setShowConfirmModal(false);

  const confirmDeleteHandler = async () => {
    setShowConfirmModal(false);
    try {
      await sendRequest(
        `http://localhost:3000/admin/delete-performer/${props.id}`,
        'DELETE',
        null,
        { Authorization: 'Bearer ' + auth.token }
      );
      props.onDelete(props.id);
    } catch (err) {}
  };


  const handleRatePerformer = async () => {
    const rating = prompt("Enter your rating (1-10):");
    if (rating && !isNaN(rating) && rating >= 1 && rating <= 10) {
      try {
        await sendRequest(
          `http://localhost:3000/rate-performer/${props.id}`,
          'PUT',
          JSON.stringify({ rating: parseInt(rating, 10) }),
          {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + auth.token
          }
        );
        props.onRate(props.id, parseInt(rating, 10));
      } catch (err) {
        console.error("Failed to submit rating:", err);
      }
    } else {
      alert("Please enter a valid rating between 1 and 10.");
    }
  };

  const calculateAverageRating = (ratings) => {
    if (!ratings || ratings.length === 0) return "No rating";
    const total = ratings.reduce((acc, ratingObj) => acc + ratingObj.rating, 0);
    return (total / ratings.length).toFixed(1);
  };

  const displayAverageRating = props.showAverageRating ? (
    <p>Average Rating: {calculateAverageRating(props.rating)}</p>
  ) : null;


  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        header="Are you sure?"
        footerClass="performer-item__modal-actions"
        footer={
          <React.Fragment>
            <Button inverse onClick={cancelDeleteHandler}>CANCEL</Button>
            <Button danger onClick={confirmDeleteHandler}>DELETE</Button>
          </React.Fragment>
        }
      >
        <p>Do you want to proceed and delete this performer? Please note that it can't be undone thereafter.</p>
      </Modal>
      <li className="performer-item">
        <Card className="performer-item__content">
          {isLoading && <LoadingSpinner asOverlay />}
          <div className="performer-item__info">
            <h2>{props.name}</h2>
            
            
            
            {displayAverageRating}
            {auth.isLoggedIn && <p>Your Rating: {props.userRating ? `${props.userRating}/10` : "Not rated"}</p>}
          </div>
          <div className="performer-item__actions">
           
            {auth.isLoggedIn && props.userRating === null && (
              <Button onClick={handleRatePerformer}>Rate</Button>
            )}
            
            {auth.isLoggedIn && (
              <Button danger onClick={showDeleteWarningHandler}>DELETE</Button>
            )}
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default PerformerItem;