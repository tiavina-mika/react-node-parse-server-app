import React from 'react';
import { useSelector } from 'react-redux';

import CustomCard from '../../components/CustomCard';
import { getCurrentUser } from '../../reducers/app';
import UserInfos from './UserInfos';

const Profile = () => {

  // selectors
  const currentUser = useSelector(getCurrentUser);
  console.log('currentUser 1: ', currentUser);

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
      {/* <ModalDialog
        title="Ajouter nouveau Projet"
        content={<ProjectForm onSubmit={_createProject} />}
        isVisible={openDialog}
        onConfirm={_submit}
        onClose={_closeDialog} 
      /> */}
    </>
  );
};

export default Profile;