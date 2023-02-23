import { useState } from 'react';
import { User } from '../models/user';

interface RegisterModalProps {
	cancelNoteModal: () => void;
	registerSuccessful: (user: User) => void;
}

const RegisterModal = ({
	cancelNoteModal,
	registerSuccessful,
}: RegisterModalProps) => {
	const [user, setUser] = useState({
		username: '',
		email: '',
		password: '',
	});

	const onSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log(user);
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
				<button onClick={cancelNoteModal}>Cancel</button>
				<button id='noteMutation' type='submit'>
					Submit
				</button>
			</form>
		</div>
	);
};
export default RegisterModal;
