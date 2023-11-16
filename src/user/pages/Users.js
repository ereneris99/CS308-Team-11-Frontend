import React from 'react';

import UsersList from '../components/UsersList';

const Users = () => {
  const USERS = [
    {
      id: 'u1',
      name: 'Simge Sağın',
      image:
        'https://fikirturu.com/wp-content/uploads/2023/05/260520231-1080x720.jpg',
      places: 3
    }
  ];

  return <UsersList items={USERS} />;
};

export default Users;
