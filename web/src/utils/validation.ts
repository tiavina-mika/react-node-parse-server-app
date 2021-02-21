import { SubmissionError } from 'redux-form';

import { previewImageMaxSize, previewImagesMaxSize } from './constants';
import { ProjectFormValues } from '../types/project.d';
import { ChangePasswordFormValues } from '../types/auth.d';

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
 * change password form validation
 * @param {*} values 
 * @return string url 
 */
export const validateChangePassword = (values: ChangePasswordFormValues) => {
	// required password
	validate({
		error: !values.password,
		name: 'password',
		message: 'Password required',
	});

	// required new password
	validate({
		error: !values.newPassword,
		name: 'newPassword',
		message: 'New Password required',
	});

	// new password characters number
	validate({
		error: values.newPassword && (values.newPassword.length < 8 || values.newPassword.length >= 45),
		name: 'newPassword',
		message: 'Password must be between 8 and 45 characters',
	});

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