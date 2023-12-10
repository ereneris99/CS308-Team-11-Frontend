import React, { useEffect, useState, useContext } from 'react';

import PerformersList from '../components/PerformersList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';

const Performers = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedPerformers, setLoadedPerformers] = useState();

  useEffect(() => {
    const fetchPerformers = async () => {
      try {
        const responseData = await sendRequest(
          'http://localhost:3000/getperformers', // Correct URL for fetching albums
          'GET',
          null,
          { Authorization: 'Bearer ' + auth.token }
        );
        setLoadedPerformers(responseData.performers);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPerformers();
  }, [sendRequest, auth.token]);

  const performerDeletedHandler = deletedPerformerId => {
    setLoadedPerformers(prevPerformers => prevPerformers.filter(performer => performer._id !== deletedPerformerId));
  };

  const updatePerformerRating = async () => {
    try {
      const responseData = await sendRequest(
        'http://localhost:3000/getperformers',
        'GET',
        null,
        { Authorization: 'Bearer ' + auth.token }
      );
      setLoadedPerformers(responseData.performers);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedPerformers && (
        <PerformersList 
          items={loadedPerformers} 
          onDeletePerformer={performerDeletedHandler} 
          onRate={updatePerformerRating}
          showAverageRating={true}
        />
      )}
    </React.Fragment>
  );
};

export default Performers;