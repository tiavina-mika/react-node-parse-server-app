import React from 'react';
import { useDispatch } from 'react-redux';
import { reset, submit } from 'redux-form';
import { Box } from '@material-ui/core';

import CustomCard from '../../components/CustomCard';
import IconButton from '../../components/IconButton';

import { createUser, goToUsers } from '../../actions/users';
import SignupForm from '../signup/SignupForm';

const UserInsert = () => {

  // dispatch
  const dispatch = useDispatch();

  // save form values
  const _save = async (values: any) => {
    await dispatch(createUser(values));
  };

  // submit form
  const _submit = () => {
    dispatch(submit('userForm'));
  };

  // clear / reset form values
  const _reset =  ()=>{
    dispatch(reset('userForm'));
  };

  // go to list page
  const _goToUsers =  () => dispatch(goToUsers());

  // action button in right side of the card header
  const otherHeaderActionButtons = (
    <Box>
      <IconButton onClick={_goToUsers} type="list" />
    </Box>
  );

  return (
    <CustomCard
      fullScreen
      title="Nouvel user"
      content={<SignupForm onSubmit={_save} />}
      okLabel="Enregistrer"
      okAction={_submit}
      withActionButtons
      cancelAction={_reset}
      actionButtonPosition='left'
      otherHeaderActionButtons={otherHeaderActionButtons}
    />
  );
};

export default UserInsert;