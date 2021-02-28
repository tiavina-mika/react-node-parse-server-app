import React from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { Box } from '@material-ui/core';

import CustomCard from '../../components/CustomCard';
import IconButton from '../../components/IconButton';

import { goToUserAdd, goToUsers, loadUser } from '../../actions/users';
import { getUser } from '../../reducers/users';
import { useLoadDataBy } from '../../hooks/useLoadData';
import UserPreviewDetail from './UserPreviewDetail';

const UserPreview = () => {
  // route params
  const { slug }: any = useParams();

  // dispatch
  const dispatch = useDispatch();

  // load data
  const user = useLoadDataBy({
    action: () => loadUser(slug, true),
    state: getUser,
    params: slug,
  });

  // go to list page
  const _goToUsers =  () => dispatch(goToUsers());

  // go to add page
  const _goToAddPage =  () => {
    dispatch(goToUserAdd());
  };

  // action button in right side of the card header
  const otherHeaderActionButtons = (
    <Box>
      <IconButton onClick={_goToUsers} type="list" />
      <IconButton onClick={_goToAddPage} type="add" />
    </Box>
  );

  return (
    <CustomCard
      fullScreen
      title={user?.get('firstName')}
      content={<UserPreviewDetail user={user} />}
      otherHeaderActionButtons={otherHeaderActionButtons}
    />
  );
};

export default UserPreview;