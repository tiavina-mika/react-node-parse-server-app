import { reduxForm } from 'redux-form';

import FormField from '../../components/form/FormField';

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
})(LoginForm);