import React, { ReactNode } from 'react';
import { Box, Typography } from '@material-ui/core';

import { User } from '../../types/user';

type Props = { currentUser: User };
const UserInfos = ({ currentUser }: Props) => {

  const infos = (label: string, value: string): ReactNode => (
    <Box display="flex">
      <Typography>
        {label} 
        :
      </Typography>
      <Typography>
        {value}
      </Typography>
    </Box>
  );

  return (
    <Box>
      {infos('Email', currentUser.get('email'))}
      {infos('Last Name', currentUser.get('lastName'))}
      {currentUser.has('firstName') && infos('First Name', currentUser.get('firstName'))}
    </Box>

  );
};

export default UserInfos;