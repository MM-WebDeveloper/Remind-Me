import { User } from '../models/user';
import NavbarLoggedInView from './NavbarLoggedInView';
import NavbarLoggedOutView from './NavbarLoggedOutView';

interface NavbarProps {
	authenticatedUser: User | null;
	// onRegister: () => void;
	onAuthentication: (user: User) => void;
	onLogout: () => void;
}

const Navbar = ({
	authenticatedUser,
	onAuthentication,
	onLogout,
}: // onRegister,
// onLogin,
// onLogout,
NavbarProps) => {
	return (
		<nav>
			<div>Logo</div>
			{authenticatedUser ? (
				<NavbarLoggedInView
					authenticatedUser={authenticatedUser}
					onLogout={onLogout}
				/>
			) : (
				<NavbarLoggedOutView onAuthentication={onAuthentication} />
			)}
		</nav>
	);
};
export default Navbar;
