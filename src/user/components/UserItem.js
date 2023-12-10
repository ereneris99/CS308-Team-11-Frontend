import React ,{useContext} from 'react';
//import { Link } from 'react-router-dom';
import { AuthContext } from '../../shared/context/auth-context';
import { useHttpClient } from '../../shared/hooks/http-hook';
import Button from '../../shared/components/FormElements/Button';

//import Avatar from '../../shared/components/UIElements/Avatar';
import Card from '../../shared/components/UIElements/Card';
import './UserItem.css';

const UserItem = props => {
  const { sendRequest } = useHttpClient();
  const auth = useContext(AuthContext);
  const followHandler = async () => {
    try {
      // Replace with your API endpoint and request structure
      const response = await sendRequest(
        `http://localhost:3000/addfriend`,
        'POST',
        JSON.stringify({friendEmail: props.email }), // Send the email in the request body
        {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + auth.token
        }
      );
      if (response.status === 409) {
        // Handle the case where users are already friends
        alert("You are already friends with this user.");
      } else {
        // Handle follow success (e.g., update UI or state)
        alert("Friend added successfully!");
      }
      // Handle follow success (e.g., update UI or state)
    } catch (err) {
      alert("You are already friends with this user.");
      // Handle errors (e.g., show error message)
    }
  };
  return (
    <li className="user-item">
      <Card className="user-item__content">
        <div className="user-item__details">
          <div className="user-item__info">
            <h2>{props.email}</h2>
            {/* Additional user details can be added here */}
          </div>
          {!props.isFriend && (
            <Button onClick={followHandler} className="user-item__follow-button">
              Follow
            </Button>
          )}
        </div>
      </Card>
    </li>
  );
};


export default UserItem;
