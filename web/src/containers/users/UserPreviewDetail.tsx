import React, { ReactNode } from 'react';
import { Box, makeStyles, Typography } from '@material-ui/core';

import { User } from '../../types/user';

const useStyles = makeStyles({
  value: {
    fontWeight: 700,
    fontSize: 18,
  },
  imagePreview: {
    width: '100%',
  },
});

type Props = { user: User };
const UserPreviewDetail = ({ user }: Props) => {
  const classes = useStyles();

  const infos = (label: string, value: string): ReactNode => (
    <Box display="flex" flexDirection="column">
      <Typography>
        {label} 
      </Typography>
      <Typography className={classes.value}>
        {value}
      </Typography>
    </Box>
  );

  return (
    <Box>
      {infos('Email', user?.get('name'))}
    </Box>
  );
};

export default UserPreviewDetail;