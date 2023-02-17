import { User } from '../models/user';
import { fetchData } from './fetch';

export async function getAuthenticatedUser(): Promise<User> {
	const res = await fetchData('/api/users', {
		method: 'GET',
	});

	return res.json();
}

export interface RegisterCredentials {
	username: string;
	email: string;
	password: string;
}

export async function registerUser(
	credentials: RegisterCredentials
): Promise<User> {
	const res = await fetchData('/api/users/register', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},

		body: JSON.stringify(credentials),
	});

	return res.json();
}

export interface LoginCredentials {
	username: string;
	password: string;
}

export async function loginUser(credentials: LoginCredentials): Promise<User> {
	const res = await fetchData('/api/users/login', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},

		body: JSON.stringify(credentials),
	});

	return res.json();
}

export async function logoutUser() {
	await fetchData('/api/users/logout', {
		method: 'POST',
	});
}
