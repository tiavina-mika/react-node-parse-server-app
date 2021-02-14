import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { submit } from 'redux-form';
import { push } from 'connected-react-router';
import { FormHelperText } from '@material-ui/core';

import Auth from '../Auth';
import LoginForm from './LoginForm';
import { login, logout } from '../../actions/auth';
import { getCurrentUser, getError } from '../../reducers/app';
import { LoginFormValues } from '../../types/auth';

const Login = () => {
	// dispatch
	const dispatch = useDispatch();

	// selectors
	const user = useSelector(getCurrentUser);
	const error = useSelector(getError);

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
				{error && (
					<FormHelperText error>
						{ error }
					</FormHelperText>
				)} 
				<LoginForm onSubmit={_login} />
		</Auth>
	);
};

export default Login;
