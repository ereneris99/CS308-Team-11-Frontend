import React, { useState, useContext } from 'react';

import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/FormElements/Button';
import Modal from '../../shared/components/UIElements/Modal';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { AuthContext } from '../../shared/context/auth-context';
import { useHttpClient } from '../../shared/hooks/http-hook';
import './SongItem.css';

const SongItem = props => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const auth = useContext(AuthContext);
  const [isLiked, setIsLiked] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true);
  };

  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
  };


  const confirmDeleteHandler = async () => {
    console.log('Deleting song with ID:', props.id); // Check the ID
    setShowConfirmModal(false);
    try {
      await sendRequest(
        `http://localhost:3000/admin/delete-song/${props.id}`,
        'DELETE',
        null,
        {
          Authorization: 'Bearer ' + auth.token
        }
      );
  
      props.onDelete(props.id);

    } catch (err) {}
  };

  const toggleLikeHandler = () => {
    setIsLiked(prev => !prev);
    // Optionally, send a request to the backend to record the like
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        header="Are you sure?"
        footerClass="song-item__modal-actions"
        footer={
          <React.Fragment>
            <Button inverse onClick={cancelDeleteHandler}>
              CANCEL
            </Button>
            <Button danger onClick={confirmDeleteHandler}>
              DELETE
            </Button>
          </React.Fragment>
        }
      >
        <p>
          Do you want to proceed and delete this song? Please note that it
          can't be undone thereafter.
        </p>
      </Modal>
      <li className="song-item">
        <Card className="song-item__content">
          {isLoading && <LoadingSpinner asOverlay />}
          <div className="song-item__info">
          <h2>{props.title}</h2>
          <h3>Album: {props.album.name}</h3>
          <p>Performer: {props.performer.name}</p>
                  </div>
          <div className="song-item__actions">
            <Button inverse onClick={toggleLikeHandler}>
              {isLiked ? 'Unlike' : 'Like'}
            </Button>
            {auth.isLoggedIn && (
              <Button to={`/songs/${props.id}`}>EDIT</Button>
            )}
            {auth.isLoggedIn && (
              <Button danger onClick={showDeleteWarningHandler}>
                DELETE
              </Button>
            )}
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default SongItem;
