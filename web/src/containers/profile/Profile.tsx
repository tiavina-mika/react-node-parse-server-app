import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography } from '@material-ui/core';

import CustomCard from '../../components/CustomCard';
import { getCurrentUser } from '../../reducers/app';

const Profile = () => {

  // selectors
  const current = useSelector(getCurrentUser);

  const content = (
    <Box>
      <Typography>
        Email: 
        {current.get('email')}
        Name: 
        {current.get('lastName')}
      </Typography>
    </Box>
  );

  return (
    <>
      <CustomCard
        title='Profile'
        content={content}
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