import React, { useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';

import SongsList from '../components/SongsList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';


const UserSongs = () => {
const [loadedSongs, setLoadedSongs] = useState();
const {isLoading,error,sendRequest,clearError}=useHttpClient();

  const userId = useParams().userId;

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:3000/list-likesong/${userId}`
        );
        setLoadedSongs(responseData.likesongs); // Update to 'likesongs'
      } catch (err) {}
    };
    fetchSongs();
  }, [sendRequest, userId]);

 
  return <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (<div 
        className="center"><LoadingSpinner />
      </div>
      )}
      {!isLoading && loadedSongs && <SongsList items={loadedSongs} />}
    </React.Fragment>;
};

export default UserSongs;
