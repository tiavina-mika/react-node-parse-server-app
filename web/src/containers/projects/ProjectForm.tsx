import React from 'react';
import { FieldArray, reduxForm } from 'redux-form';
import { makeStyles } from '@material-ui/core/styles';

import FormField from '../../components/form/FormField';
import DropFileUploader from '../../components/form/DropFileUploader';
import { maxProjectImages } from '../../utils/constants';
import TagsInputField from './TagsInputField';

const useStyles = makeStyles({
  root: {
    composes: 'flexColumn stretch center',
  },
});

type Props = { handleSubmit: any };
const ProjectForm = ({ handleSubmit }: Props) => {
  
  const classes = useStyles();

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <FormField label='Nom' name='name' fullWidth />

      <FormField
				label='Image Preview'
        name='previewImage'
        component={DropFileUploader}
        fullWidth
      />

      <FormField
				label='Images'
        name='images'
        component={DropFileUploader}
        fullWidth
        maxFiles={maxProjectImages}
      />

      <FieldArray label="Tags" name="tags" component={TagsInputField} />

      <input type='submit' />
    </form>
  );
};

export default reduxForm({
  form: 'projectForm',
  enableReinitialize : true,
})(ProjectForm);
