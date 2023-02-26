import { useState } from 'react';
import { User } from '../models/user';
import * as UsersApi from '../network/users.api';

interface EntryModalProps {
	typeOfEntry: string;
	cancelEntryModal: () => void;
	onUserRegistered: (user: User) => void;
}

const EntryModal = ({
	typeOfEntry,
	cancelEntryModal,
	onUserRegistered,
}: EntryModalProps) => {
	const [user, setUser] = useState({
		username: '',
		email: '',
		password: '',
	});
	const [entryError, setEntryError] = useState<string | null>(null);

	const onSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			const newUser = await UsersApi.registerUser(user);
			onUserRegistered(newUser);
		} catch (error) {
			alert(error);
			let message = 'Unknown Error';
			if (error instanceof Error) message = error.message;
			setEntryError(message);
		}
	};

	return (
		<div>
			<form id='userMutation' onSubmit={(e) => onSubmit(e)} action='submit'>
				{typeOfEntry !== 'register' ? null : (
					<>
						<label htmlFor='Username'>Username</label>
						<input
							onChange={(e) => setUser({ ...user, username: e.target.value })}
							type='text'
							placeholder='Username'
							name='username'
							id='username'
						/>
					</>
				)}
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
				{entryError && <p>{entryError}</p>}
				<button>Cancel</button>
				<button id='userMutation' type='submit'>
					{typeOfEntry === 'register' ? 'Register' : 'Login'}
				</button>
			</form>
		</div>
	);
};
export default EntryModal;
