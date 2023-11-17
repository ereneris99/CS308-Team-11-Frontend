import React from 'react';

import UsersList from '../components/UsersList';

const Users = () => {
  const USERS = [
    {
      id: 'u1',
      name: 'Eren Eris',
      image:
        'https://fikirturu.com/wp-content/uploads/2023/05/260520231-1080x720.jpg',
      places: 2
    },
    {
      id: 'u2',
      name: 'Özgür Artok',
      image:
        'https://images2.minutemediacdn.com/image/upload/c_crop,w_2000,h_1125,x_0,y_320/c_fill,w_720,ar_16:9,f_auto,q_auto,g_auto/images/GettyImages/mmsport/90min_tr_international_web/01hbxkm1g9frhbk4mjve.jpg',
      places: 1
    },
    {
      id: 'u3',
      name: 'Barbo',
      image:
        'https://imgrosetta.mynet.com.tr/file/9915147/640xauto.jpg',
      places: 0
    },
    {
      id: 'u4',
      name: 'User',
      image:"",
      places: 0
    },
  ];

  return <UsersList items={USERS} />;
};

export default Users;
