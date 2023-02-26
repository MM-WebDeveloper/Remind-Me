import { User } from '../models/user';
import NavbarLoggedInView from './NavbarLoggedInView';
import NavbarLoggedOutView from './NavbarLoggedOutView';

interface NavbarProps {
	loggedInUser: User | null;
	onRegister: () => void;
	onLogin: () => void;
	onLogout: () => void;
}

const Navbar = ({
	loggedInUser,
	onRegister,
	onLogin,
	onLogout,
}: NavbarProps) => {
	return (
		<nav>
			<div>Logo</div>
			{loggedInUser ? (
				<NavbarLoggedInView user={loggedInUser} onLogout={onLogout} />
			) : (
				<NavbarLoggedOutView onLogin={onLogin} onRegister={onRegister} />
			)}
		</nav>
	);
};
export default Navbar;
