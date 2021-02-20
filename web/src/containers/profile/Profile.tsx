import React from 'react';
import { useSelector } from 'react-redux';

import CustomCard from '../../components/CustomCard';
import { getCurrentUser } from '../../reducers/app';
import UserInfos from './UserInfos';

const Profile = () => {

  // selectors
  const currentUser = useSelector(getCurrentUser);

  return (
    <>
      <CustomCard
        title='Profile'
        content={<UserInfos currentUser={currentUser} />}
        withActionButtons={false}
        // actionHeaderButtons={<AddIconButton onAdd={_openDialog} />}
        // onHeaderPrimaryClick={_openDialog}
        headerPrimaryLabel="Nouveau Projet"
        fullScreen
      />
    </>
  );
};

export default Profile;