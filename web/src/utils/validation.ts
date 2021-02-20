import { SubmissionError } from 'redux-form';

/**
 * promo banner's form validation
 * @param {*} values 
 * @return string url 
 */
export const validateChangePassword = (values: any) => {
	if (!values.password) {
		throw new SubmissionError({
      password: 'Password required',
		});
	}

  if (!values.newPassword) {
		throw new SubmissionError({
      newPassword: 'New Password required',
		});
	}

  if (values.newPassword && (values.newPassword.length < 8 || values.newPassword.length >= 45)) {
		throw new SubmissionError({
      newPassword: 'Password must be between 8 and 20 characters ',
		});
	}

  if (!values.newConfirmedPassword) {
		throw new SubmissionError({
      newConfirmedPassword: 'Confirm your Password',
		});
	}

  if (values.newPassword !== values.newConfirmedPassword) {
		throw new SubmissionError({
      newConfirmedPassword: 'Password does not match',
		});
	}
};
