import React, { ReactNode } from 'react';
import { Box, FormLabel, Fab, makeStyles, Typography, IconButton, Paper, Theme, createStyles } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';

import FormField from '../../components/form/FormField';

const useStyles = makeStyles((theme: Theme) => createStyles({
  card: {
    width: '100%',
    padding: `0 ${theme.spacing(2)}px ${theme.spacing(2)}px`,
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  label: {
    alignSelf: 'center',
  },
  blockHeader: {
    composes: 'flexRow spaceBetween center',
  },
}));

const TagsInputField = ({
  fields, 
  label, 
  meta: { touched, error, submitFailed },
}: any) => {
  // styles
  const classes = useStyles();

  return (
    <Box width="100%" mt={2} mb={2}>
      <Box mb={2}>
        <FormLabel>
          {label}
        </FormLabel>
      </Box>
        {fields.map((type: any, index: number): ReactNode => (
          <Paper className={classes.card} key={index} variant="outlined" square>
            <Box className={classes.blockHeader}>
              <Typography className={classes.label}>
                {label} 
                #
                {index + 1}
              </Typography>
              <IconButton
                type="button"
                title="Remove Member"
                onClick={() => fields.remove(index)}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
            <FormField
              label="Title"
              name={`${type}.title`}
              fullWidth
            />
          </Paper>
        ))}
        <Box>
          <Fab 
            onClick={() => fields.push({})}
            color="primary"
            variant="round"
            aria-label="add"
          >
            <AddIcon />
          </Fab>
          {(touched || submitFailed) && error && (
            <span>
              {error}
            </span>
          )}
        </Box>
    </Box>

  );
};

export default TagsInputField;