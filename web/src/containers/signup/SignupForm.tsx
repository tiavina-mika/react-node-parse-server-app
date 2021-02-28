import { reduxForm } from 'redux-form';

import FormField from '../../components/form/FormField';

type Props = { handleSubmit: any };
const SignupForm = ({ handleSubmit } : Props) => {

	return (
		<form onSubmit={handleSubmit}>
      <FormField label='Nom' name='firstName' fullWidth required />
      <FormField label='Prénom' name='lastName' fullWidth />
      <FormField type="email" label='Email' name='email' fullWidth required />
      <FormField type='password' label='Mot de passe' name='password' fullWidth required />
			<FormField type='password' label='confirmamtion du Mot de passe' name='confirmedPassword' fullWidth required />				

			<input id='signup' type="submit" />
		</form>
	);
};

export default reduxForm({
	form: 'signup',
})(SignupForm);