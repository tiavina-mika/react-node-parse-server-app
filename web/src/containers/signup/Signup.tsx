import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { submit } from 'redux-form';
import { push } from 'connected-react-router';

import Auth from '../Auth';
import { getCurrentUser, getError } from '../../reducers/app';
import SignupForm from './SignupForm';
import { SignupFormValues } from '../../types/auth';
import { signup } from '../../actions/auth';
import { goToDashboard } from '../../actions/app';
import { validateSignup } from '../../utils/validation';

const Signup = () => {
	// dispatch
	const dispatch = useDispatch();

	// selectors
	const user = useSelector(getCurrentUser);
	
	const error = useSelector(getError);

	// redirection
	if (user) {
		dispatch(goToDashboard());
		return null;
	}

	const _submit = () => dispatch(submit('signup'));
	const _goToLogin = () => dispatch(push('/login'));

	// submit
	const _signup = (values: any) => {
		validateSignup(values);
		dispatch(signup(values));
	};

	return (
		<Auth
			title='Création de compte'
			onSubmit={_submit}
			submitLabel="Créer"
			onSecondarySubmit={_goToLogin}
			secondaryButtonLabel="Se connecter"
			error={error}
		>
				<SignupForm onSubmit={_signup} />
		</Auth>
	);
};

export default Signup;
