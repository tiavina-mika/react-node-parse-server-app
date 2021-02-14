import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { submit } from 'redux-form';
import { push } from 'connected-react-router';

import Auth from '../Auth';
import LoginForm from './LoginForm';
import { login, logout } from '../../actions/auth';
import { getCurrentUser } from '../../reducers/app';
import { LoginFormValues } from '../../types/auth';

const Login = () => {
	// dispatch
	const dispatch = useDispatch();

	// selectors
	const user = useSelector(getCurrentUser);

	if (user) {
		dispatch(logout());
	}

	const _goToSignup = () => dispatch(push('/signup'));
	const _submit = () => dispatch(submit('login'));

	const _login = (values: LoginFormValues) => {
		dispatch(login(values.email, values.password));
	};

	return (
		<Auth
			title='Connexion'
			onSubmit={_submit}
			submitLabel="Se connecter"
			onSecondarySubmit={_goToSignup}
			secondaryButtonLabel="Créer un compte"
		>
				<LoginForm onSubmit={_login} />
		</Auth>
	);
};

export default Login;
