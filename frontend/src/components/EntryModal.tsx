import { useState } from 'react';
import { User } from '../models/user';
import * as UsersApi from '../network/users.api';

interface EntryModalProps {
	cancelNoteModal: () => void;
	registerSuccessful: (user: User) => void;
}

// const RegisterModal = ({
// 	cancelNoteModal,
// 	registerSuccessful,
// }: RegisterModalProps) => {
const EntryModal = () => {
	const [user, setUser] = useState({
		username: '',
		email: '',
		password: '',
	});

	const onSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const newUser = await UsersApi.registerUser(user);
		console.log(newUser);
	};

	return (
		<div>
			<form id='userMutation' onSubmit={(e) => onSubmit(e)} action='submit'>
				<label htmlFor='Username'>Username</label>
				<input
					onChange={(e) => setUser({ ...user, username: e.target.value })}
					type='text'
					placeholder='Username'
					name='username'
					id='username'
				/>
				<label htmlFor='Email'>Email</label>
				<input
					onChange={(e) => setUser({ ...user, email: e.target.value })}
					type='text'
					placeholder='Email'
					name='email'
					id='email'
				/>
				<label htmlFor='Password'>Password</label>
				<input
					onChange={(e) => setUser({ ...user, password: e.target.value })}
					type='text'
					placeholder='Password'
					name='password'
					id='password'
				/>
				<button>Cancel</button>
				<button id='userMutation' type='submit'>
					Submit
				</button>
			</form>
		</div>
	);
};
export default EntryModal;
