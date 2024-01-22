import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';

const SearchResults = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [searchResults, setSearchResults] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const fetchSearchResults = async () => {
      const query = new URLSearchParams(location.search);
      const searchTerm = query.get('search');

      try {
        const responseData = await sendRequest(
          `http://localhost:3000/search-songs?search=${encodeURIComponent(searchTerm)}`,
          'GET',
          null,
          { Authorization: 'Bearer ' + auth.token }
        );
        setSearchResults(responseData.songs);
      } catch (err) {
        console.error(err);
      }
    };

    fetchSearchResults();
  }, [sendRequest, location.search, auth.token]);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay />}
      <div>
        <h2>Search Results</h2>
        {!isLoading && searchResults.length > 0 ? (
          searchResults.map((song, index) => (
            <div key={index}>
              <p>{song.title}</p>
              {/* Add more song details here */}
            </div>
          ))
        ) : (
          !isLoading && <p>No results found.</p>
        )}
      </div>
    </React.Fragment>
  );
};

export default SearchResults;