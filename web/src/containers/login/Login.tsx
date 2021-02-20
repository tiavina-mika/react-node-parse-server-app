import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { submit } from 'redux-form';
import { push } from 'connected-react-router';
import { useLocation } from 'react-router';

import Auth from '../Auth';
import LoginForm from './LoginForm';
import { login } from '../../actions/auth';
import { getCurrentUser, getError } from '../../reducers/app';
import { LoginFormValues } from '../../types/auth';
import { goToDashboard } from '../../actions/app';

const Login = () => {
	// dispatch
	const dispatch = useDispatch();

	const location = useLocation();

	// selectors
	const user = useSelector(getCurrentUser);
	const error = useSelector(getError);

	// redirection
	if (user && location.pathname !== '/login') {
		dispatch(goToDashboard());
		return null;
	}

	const _goToSignup = () => dispatch(push('/signup'));
	const _submit = () => dispatch(submit('login'));

	// submit
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
			error={error}
		>
				<LoginForm onSubmit={_login} />
		</Auth>
	);
};

export default Login;
