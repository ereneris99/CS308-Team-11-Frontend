import React from 'react';
import { Link } from 'react-router-dom';

import Avatar from '../../shared/components/UIElements/Avatar';
import Card from '../../shared/components/UIElements/Card';
import './UserItem.css';

const UserItem = props => {
  return (
    <li className="user-item">
      <Card className="user-item__content">
        <Link to={`/${props.id}/places`}>
          <div className="user-item__image">
          <Avatar image={props.image} alt={props.email} />
          </div>
          <div className="user-item__info">
            <h2>{props.email}</h2>
            <h3>
              {props.likedsong} {props.likedsong === 1 ? 'Song' : 'Songs'}
            </h3>
          </div>
        </Link>
      </Card>
    </li>
  );
};

export default UserItem;
