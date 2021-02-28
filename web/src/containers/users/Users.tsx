import React from 'react';
import { useDispatch } from 'react-redux';
import { submit } from 'redux-form';
import { useToggle } from 'react-use';

import CustomCard from '../../components/CustomCard';
import ModalDialog from '../../components/ModalDialog';
import DialogTitleIcon from '../../components/DialogTitleIcon';

import UsersTable from './UsersTable';
import UserForm from './UserForm';

import { getUsers } from '../../reducers/users';
import { createUser, goToUserAdd, loadUsers } from '../../actions/users';
import { useLoadData } from '../../hooks/useLoadData';

const Users = () => {
  // states
  const [on, toggle] =  useToggle(false);

  // dispatch
  const dispatch = useDispatch();

  // selectors
  const users = useLoadData(loadUsers, getUsers) || [];

  // go to user form add page
  const _goToUserAdd = () => {
    dispatch(goToUserAdd());
  };

  // save form values
  const _createUser = async (values: any) => {
    await dispatch(createUser(values));
    toggle();
  };

  // submit form
  const _submit =  () => {
    dispatch(submit('userForm'));
  };

  return (
    <>
      <CustomCard
        title='Liste des uilisateurs'
        content={<UsersTable rows={users} />}
        withActionButtons={false}
        onHeaderPrimaryClick={toggle}
        headerPrimaryLabel="Nouvel utilisateur"
        fullScreen
      />
      <ModalDialog
        title="Ajouter nouvel utilisateur"
        content={<UserForm onSubmit={_createUser} />}
        iconTitle={<DialogTitleIcon onClick={_goToUserAdd} />}
        isVisible={on}
        onConfirm={_submit}
        onClose={toggle} 
      />
    </>
  );
};

export default Users;