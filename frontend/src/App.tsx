import { useEffect, useState } from 'react';
import * as UsersApi from './network/users.api';
import Navbar from './components/Navbar';
import { User } from './models/user';
import LoggedInView from './pages/LoggedInView';
import LoggedOutView from './pages/LoggedOutView';

const App = () => {
	const [authenticatedUser, setAuthenticatedUser] = useState<User | null>();

	useEffect(() => {
		async function fetchLoggedInUser() {
			try {
				const user = await UsersApi.getAuthenticatedUser();
				setAuthenticatedUser(user);
			} catch (error) {
				console.error(error);
			}
		}
		fetchLoggedInUser();
	}, []);

	const onAuthentication = (user: User) => {
		setAuthenticatedUser(user);
	};

	return (
		<>
			<Navbar
				authenticatedUser={authenticatedUser!}
				onAuthentication={onAuthentication}
				onLogout={() => setAuthenticatedUser(null)}
			/>
			{authenticatedUser ? <LoggedInView /> : <LoggedOutView />}
		</>
	);
};
export default App;
