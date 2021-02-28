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
 * @param values {object}
 */
export const validateSignup = (values: SignupFormValues) => {
 
	// required email
	validate({
		error: !values.email,
		name: 'email',
		message: 'Email required',
	});

	// invalid email
	validate({
		error: values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email),
		name: 'email',
		message: 'Invalid email address',
	});
	
	// required email
	validate({
		error: !values.firstName,
		name: 'firstName',
		message: 'Name required',
	});
	
	validatePassword(values.password);

	// new confirmed password required
	validate({
		error: !values.confirmedPassword,
		name: 'confirmedPassword',
		message: 'Confirm your Password',
	});

	// matched password
	validate({
		error: values.password !== values.confirmedPassword,
		name: 'confirmedPassword',
		message: 'Password does not match',
	});
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
 * tags field validation
 * @param {*} values 
 * @param {*} field 
 * @return {void} 
 */
const validateProjectTagsField = (values: any, field: any) => {
  if (!values) return;

  values.forEach((_: any, index: number): void => {
		// title field
		if (!values[index].title) {
			throw new SubmissionError({
				[field]: {
					[index]: { 
						title: 'Titre requis',
					},
				} });
		}
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

  validateProjectTagsField(values.tags, 'tags'); 
};
