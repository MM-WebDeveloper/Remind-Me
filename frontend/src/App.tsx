import { useEffect, useState } from 'react';
import * as UsersApi from './network/users.api';
import Navbar from './components/Navbar';
import { User } from './models/user';
import { BrowserRouter } from 'react-router-dom';
import { Route, Routes } from 'react-router';
import NotesPage from './pages/NotesPage';
import PrivacyPage from './pages/PrivacyPage';
import PageNotFound from './pages/PageNotFound';

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
		<BrowserRouter>
			<div>
				<Navbar
					authenticatedUser={authenticatedUser!}
					onAuthentication={onAuthentication}
					onLogout={() => setAuthenticatedUser(null)}
				/>
			</div>
			<Routes>
				<Route
					path='/'
					element={<NotesPage authenticatedUser={authenticatedUser!} />}
				/>
				<Route path='/privacy' element={<PrivacyPage />} />
				<Route path='/*' element={<PageNotFound />} />
			</Routes>
		</BrowserRouter>
	);
};
export default App;
