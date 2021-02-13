import { reduxForm } from 'redux-form';

import { validatePassword } from '../../utils/utils';
import FormField from '../../components/form/FormField';
import { SignupFormValues } from '../../types/auth';

const validate = (values: SignupFormValues) => {
	const errors: any = {};
	if (!values.email) {
		errors.email = 'Required';
	}
	validatePassword(values.password, errors);
	return errors;
};

type Props = { handleSubmit: any };
const SignupForm = ({ handleSubmit } : Props) => {

	return (
		<form onSubmit={handleSubmit}>
      <FormField label='Nom' name='firstname' fullWidth />
      <FormField label='Prénom' name='lastname' fullWidth />
      <FormField type="email" label='Email' name='email' fullWidth />
      <FormField type='password' label='Mot de passe' name='password' fullWidth />
			<input id='signup' type="submit" />
		</form>
	);
};

export default reduxForm({
	form: 'signup',
	validate,
})(SignupForm);