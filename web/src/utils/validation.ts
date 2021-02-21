import { SubmissionError } from 'redux-form';

import { previewImageMaxSize, previewImagesMaxSize } from './constants';
import { ProjectFormValues } from '../types/project.d';
import { ChangePasswordFormValues, LoginFormValues, SignupFormValues } from '../types/auth.d';

/**
 * @param value {string}
 */
const validatePasswordLength = (value: string) => {
	return value && (value.length < 8 || value.length >= 45);
};

const passwordLengthErrorMessage: string = 'Password must be between 8 and 45 characters';

type Validate = {
	error: any;
	name: string;
	message: string;
};
const validate = ({ error, name, message }: Validate) => {
	if (error) {
		throw new SubmissionError({
      [name]: message,
		});
	}
};

/**
 *
 * @param values {object}
 */
export const validatePassword = (
	error: string, 
	name: 'password' | 'newPassword' | 'newConfirmedPassword' = 'password',
	message: string = 'Password required',
) => {
	// required password
	validate({
		error: !error,
		name,
		message,
	});

	// required password
	validate({
		error: validatePasswordLength(error),
		name,
		message: passwordLengthErrorMessage,
	});	
};


/**
 *
 * @param values {object}
 */
export const validateLogin = (values: LoginFormValues) => {
 
	// required email
	validate({
		error: !values.email,
		name: 'email',
		message: 'Email required',
	});

	validatePassword(values.password);
};

/**
 *
 * @param values {object}
 */
export const validateSignup = (values: SignupFormValues) => {
 
	// required email
	validate({
		error: !values.email,
		name: 'email',
		message: 'Email required',
	});

	// required email
	validate({
		error: !values.lastName,
		name: 'lastName',
		message: 'Lastname required',
	});
	
	validatePassword(values.password);
};

/**
 * change password form validation
 * @param {*} values 
 * @return string url 
 */
export const validateChangePassword = (values: ChangePasswordFormValues) => {
	// required password
	validatePassword(values.password);

	// required new password
	validatePassword(values.newPassword, 'newPassword', 'New Password required');

	// new confirmed password required
	validate({
		error: !values.newConfirmedPassword,
		name: 'newConfirmedPassword',
		message: 'Confirm your Password',
	});

	// matched password
	validate({
		error: values.newPassword !== values.newConfirmedPassword,
		name: 'newConfirmedPassword',
		message: 'Password does not match',
	});
};

/**
 * project form validation
 * @param {*} values 
 * @return string url 
 */
export const validateProject = (values: ProjectFormValues) => {
	// name required
	validate({
		error: !values.name,
		name: 'name',
		message: 'Name required',
	});

	// preview image required
	validate({
		error: !values.previewImage,
		name: 'previewImage',
		message: 'Preview image required',
	});
	
	// preview image size max
	validate({
		error: values.previewImage && values.previewImage.size > previewImageMaxSize,
		name: 'previewImage',
		message: 'Image size max should be ' + previewImageMaxSize,
	});
	
	// images size max
	if (values.images) {
		const imageMax = values.images.find((image:any): boolean => image.size > previewImagesMaxSize);
		if (!imageMax) return;
		validate({
			error: imageMax.size > previewImagesMaxSize,
			name: 'images',
			message: 'Image size max should be ' + previewImagesMaxSize,
		});
	}
};
