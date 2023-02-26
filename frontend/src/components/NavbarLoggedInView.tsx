import { User } from '../models/user';
import * as UsersApi from '../network/users.api';

interface NavbarLoggedInViewProps {
	user: User;
	onLogout: () => void;
}

const NavbarLoggedInView = ({ user, onLogout }: NavbarLoggedInViewProps) => {
	const logout = async () => {
		try {
			await UsersApi.logoutUser();
			onLogout();
		} catch (error) {
			console.error(error);
			alert(error);
		}
	};

	return (
		<>
			<p>{user.username}</p>
			<button onClick={logout}>Logout</button>
		</>
	);
};
export default NavbarLoggedInView;
