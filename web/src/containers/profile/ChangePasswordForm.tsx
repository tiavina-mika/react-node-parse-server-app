import { Box, Button } from '@material-ui/core';
import { reduxForm } from 'redux-form';

import FormField from '../../components/form/FormField';

type Props = { handleSubmit: any; };
const ChangePasswordForm = ({ handleSubmit } : Props) => {

	return (
		<form onSubmit={handleSubmit}>
			<Box mb={2}>
				<FormField type='password' label='Mot de passe' name='password' fullWidth required />
				<FormField type='password' label='Nouveau Mot de passe' name='newPassword' fullWidth required />
				<FormField type='password' label='confirmamtion du Mot de passe' name='newConfirmedPassword' fullWidth required />				
			</Box>
			
			<Button id='changePassword' type="submit" variant="contained" color="primary">
				Enregistrer
			</Button>
		</form>
	);
};

export default reduxForm({
	form: 'changePassword',
})(ChangePasswordForm);