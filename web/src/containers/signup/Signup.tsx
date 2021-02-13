import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { submit } from 'redux-form';

import Auth from '../Auth';
// import { signup } from '../../actions/app';
import { getCurrentUser } from '../../reducers/app';
import SignupForm from './SignupForm';
import { SignupFormValues } from '../../types/auth';
import { signup } from '../../actions/auth';

const Signup = () => {
	// dispatch
	const dispatch = useDispatch();

	// selectors
	const user = useSelector(getCurrentUser);

	if (user) {
		return null;
	}

	const _submit = () => dispatch(submit('signup'));

	const _signup = (values: SignupFormValues) => {
		dispatch(signup({ ...values }));
	};

	return (
		<Auth
			title='Création de compte'
			onSubmit={_submit}
			submitLabel="Créer"
			onSecondarySubmit={() => {}}
			secondaryButtonLabel="Se connecter"
		>
				<SignupForm onSubmit={_signup} />
		</Auth>
	);
};

export default Signup;
