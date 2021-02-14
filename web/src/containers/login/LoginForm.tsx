import { reduxForm } from 'redux-form';

import { validatePassword } from '../../utils/utils';
import FormField from '../../components/form/FormField';
import { LoginFormValues } from '../../types/auth';

const validate = (values: LoginFormValues) => {
	const errors: any = {};
	if (!values.email) {
		errors.email = 'Required';
	}
	validatePassword(values.password, errors);
	return errors;
};

type Props = { handleSubmit: any; };
const LoginForm = ({ handleSubmit } : Props) => {

	return (
		<form onSubmit={handleSubmit}>
      <FormField type="email" label='Email' name='email' fullWidth error="Nope" />
      <FormField type='password' label='Mot de passe' name='password' fullWidth />
			<input id='login' type="submit" />
		</form>
	);
};

export default reduxForm({
	form: 'login',
	validate,
})(LoginForm);