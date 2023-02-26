import { useState } from 'react';
import { User } from '../models/user';
import * as UsersApi from '../network/users.api';

interface EntryModalProps {
	typeOfEntry: boolean;
	cancelEntryModal: () => void;
	onUserRegistered: (user: User) => void;
	onUserLoggedIn: (user: User) => void;
}

const EntryModal = ({
	typeOfEntry,
	cancelEntryModal,
	onUserRegistered,
	onUserLoggedIn,
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
			if (typeOfEntry) {
				const newUser = await UsersApi.registerUser(user);
				onUserRegistered(newUser);
			} else {
				const loggedInUser = await UsersApi.loginUser(user);
				onUserLoggedIn(loggedInUser);
			}
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
				<label htmlFor='Username'>Username</label>
				<input
					onChange={(e) => setUser({ ...user, username: e.target.value })}
					type='text'
					placeholder='Username'
					name='username'
					id='username'
				/>

				{typeOfEntry ? (
					<>
						<label htmlFor='Email'>Email</label>
						<input
							onChange={(e) => setUser({ ...user, email: e.target.value })}
							type='text'
							placeholder='Email'
							name='email'
							id='email'
						/>
					</>
				) : null}

				<label htmlFor='Password'>Password</label>
				<input
					onChange={(e) => setUser({ ...user, password: e.target.value })}
					type='password'
					placeholder='Password'
					name='password'
					id='password'
				/>
				{entryError && <p>{entryError}</p>}
				<button onClick={cancelEntryModal}>Cancel</button>
				<button id='userMutation' type='submit'>
					{typeOfEntry ? 'Register' : 'Login'}
				</button>
			</form>
		</div>
	);
};
export default EntryModal;
