import { push } from 'connected-react-router';
import Parse from 'parse';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { clearUserIntoLocalStorage, loginSuccess, retrieveUserFromLocalStorage } from '../actions/auth';

/* eslint-disable react/jsx-closing-tag-location */
export const useLogin = () => {
	// dispatch
	// const store = useStore();

  // dispatch
	const dispatch = useDispatch();
	const state = useSelector(state => state);

	useEffect(() => {
		const init = async () => {
			// ---- loading user and checking token validity ---- //
			let currentUser;
			const userFromLocalStorage = retrieveUserFromLocalStorage(); // it should be before Parse.User.Current()

			try {
				currentUser = Parse.User.current(); // it can throw (rarely)
				if (currentUser) {
					// is the session valid ? (some issues might happen)
					try {
						await Parse.Session.current();
					} catch (err) {
						console.log('Error retrieving the session object => 400 but, in fact, invalid token => logout');
						currentUser = null;
						throw new Error('Bad session');
					}
				}
			} catch (err) {
				const invalidSession = err.message === 'Bad session';
				if (invalidSession) {
					// ---- bad session ---- //
					// clean up user into localStorage
					clearUserIntoLocalStorage();
				} else {
					// ---- error while checking Parse.User.Current ---- //
					try {
						let parseUserError;
						if (!currentUser && userFromLocalStorage) {
							currentUser = userFromLocalStorage;
							parseUserError = 'Parse.User.current() throws an error.';
						}
						const installationId = localStorage.getItem('Parse/mika/installationId');
						await Parse.Cloud.run('loginError', { installationId, error: parseUserError || err });
					} catch (e) {
						console.log('Error retrieving currentUser : ' + e.message);
					}
				}

				if ((currentUser && !currentUser.equals(userFromLocalStorage as any)) || invalidSession) {
					try {
						await Parse.User.logOut();

					} catch (err2) {
						// might happen, but swallowed
					}
				}
			}

			if (!currentUser) {
				dispatch(push('/login'));
			} else {
				await loginSuccess()(dispatch, state);
			}
		};
		init();
	}, [state, dispatch]);
};