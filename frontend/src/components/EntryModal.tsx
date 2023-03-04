import { useEffect, useRef, useState } from 'react';
import { User } from '../models/user';
import * as UsersApi from '../network/users.api';

interface EntryModalProps {
	typeOfEntry: boolean;
	entryError: string | null;
	displayEntryError: (message: string) => void;
	onAuthentication: (user: User) => void;
	cancelEntryModal: () => void;
}

const EntryModal = ({
	typeOfEntry,
	entryError,
	displayEntryError,
	onAuthentication,
	cancelEntryModal,
}: EntryModalProps) => {
	const [user, setUser] = useState({
		username: '',
		email: '',
		password: '',
	});
	const inputRef = useRef<any>();

	useEffect(() => {
		inputRef.current.focus();
		setUser({ username: '', email: '', password: '' });
	}, [typeOfEntry]);

	const onSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			if (typeOfEntry) {
				const newUser = await UsersApi.registerUser(user);
				onAuthentication(newUser);
			} else {
				console.log('I happened');
				const loggedInUser = await UsersApi.loginUser(user);
				onAuthentication(loggedInUser);
			}
		} catch (error) {
			alert(error);
			let message = 'Unknown Error';
			if (error instanceof Error) message = error.message;
			displayEntryError(message);
		}
	};

	return (
		<div>
			<form id='userMutation' onSubmit={(e) => onSubmit(e)} action='submit'>
				<label htmlFor='Username'>Username</label>
				<input
					ref={inputRef}
					onChange={(e) => setUser({ ...user, username: e.target.value })}
					type='text'
					placeholder='Username'
					name='username'
					id='username'
					value={user.username}
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
							value={user.email}
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
					value={user.password}
				/>
				{entryError && <p>{entryError}</p>}
				<div>
					<button type='button' onClick={cancelEntryModal}>
						Cancel
					</button>
					<button id='userMutation' type='submit'>
						{typeOfEntry ? 'Register' : 'Login'}
					</button>
				</div>
			</form>
		</div>
	);
};
export default EntryModal;
