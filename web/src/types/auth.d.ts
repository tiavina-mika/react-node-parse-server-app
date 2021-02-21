export interface SignupFormValues {
	email: string;
	password: string;
	firstName?: string;
	lastName: string;
}

export interface LoginFormValues {
	email: string;
	password: string;
}

export interface ChangePasswordFormValues {
	password: string;
	newPassword: string;
	newConfirmedPassword: string;
}

