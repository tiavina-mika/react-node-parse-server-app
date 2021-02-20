import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changePassword } from '../../actions/auth';

import CustomCard from '../../components/CustomCard';
import { getCurrentUser } from '../../reducers/app';
import { validateChangePassword } from '../../utils/validation';
import ChangePasswordForm from './ChangePasswordForm';

const ChangePassword = () => {

  // dispatch
  const dispatch = useDispatch();

  // selectors
  const currentUser = useSelector(getCurrentUser);

  const _changePassword = async (values: any) => {
    validateChangePassword(values);

    dispatch(changePassword(values));
  };

  return (
    <>
      <CustomCard
        title='Changer mot de pass'
        content={<ChangePasswordForm onSubmit={_changePassword} />}
        withActionButtons={false}
        fullScreen
      />
    </>
  );
};

export default ChangePassword;