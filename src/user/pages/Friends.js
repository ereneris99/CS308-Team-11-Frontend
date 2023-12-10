import React, { useEffect, useState, useContext } from 'react';
import UsersList from '../components/UsersList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';

const Friends = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedFriends, setLoadedFriends] = useState([]);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const responseData = await sendRequest(
          'http://localhost:3000/getusersfriends',
          'GET',
          null,
          { Authorization: 'Bearer ' + auth.token }
        );
        setLoadedFriends(responseData.friends);
      } catch (err) {
        console.error(err);
      }
    };
    fetchFriends();
  }, [sendRequest, auth.token]);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay />}
      {!isLoading && loadedFriends && (
        <UsersList items={loadedFriends} noItemsMessage="No friends found." />
      )}
    </React.Fragment>
  );
};

export default Friends;