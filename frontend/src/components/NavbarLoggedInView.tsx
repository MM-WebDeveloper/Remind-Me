import { User } from '../models/user';
import * as UsersApi from '../network/users.api';

interface NavbarLoggedInViewProps {
	authenticatedUser: User;
	onLogout: () => void;
}

const NavbarLoggedInView = ({
	authenticatedUser,
	onLogout,
}: NavbarLoggedInViewProps) => {
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
			<p>{authenticatedUser.username}</p>
			<button onClick={logout}>Logout</button>
		</>
	);
};
export default NavbarLoggedInView;
