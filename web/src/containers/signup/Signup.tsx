import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { submit } from 'redux-form';
import { push } from 'connected-react-router';

import Auth from '../Auth';
import { getCurrentUser } from '../../reducers/app';
import SignupForm from './SignupForm';
import { SignupFormValues } from '../../types/auth';
import { logout, signup } from '../../actions/auth';

const Signup = () => {
	// dispatch
	const dispatch = useDispatch();

	// selectors
	const user = useSelector(getCurrentUser);

	if (user) {
		dispatch(logout());
	}

	const _submit = () => dispatch(submit('signup'));
	const _goToLogin = () => dispatch(push('/login'));

	const _signup = (values: SignupFormValues) => {
		dispatch(signup({ ...values }));
	};

	return (
		<Auth
			title='Création de compte'
			onSubmit={_submit}
			submitLabel="Créer"
			onSecondarySubmit={_goToLogin}
			secondaryButtonLabel="Se connecter"
		>
				<SignupForm onSubmit={_signup} />
		</Auth>
	);
};

export default Signup;
