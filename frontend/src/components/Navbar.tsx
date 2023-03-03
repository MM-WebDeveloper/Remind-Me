import { Link } from 'react-router-dom';
import { User } from '../models/user';
import NavbarLoggedInView from './NavbarLoggedInView';
import NavbarLoggedOutView from './NavbarLoggedOutView';

interface NavbarProps {
	authenticatedUser: User | null;
	onAuthentication: (user: User) => void;
	onLogout: () => void;
}

const Navbar = ({
	authenticatedUser,
	onAuthentication,
	onLogout,
}: NavbarProps) => {
	return (
		<nav>
			<Link to='/'>Logo</Link>
			{authenticatedUser ? (
				<NavbarLoggedInView
					authenticatedUser={authenticatedUser}
					onLogout={onLogout}
				/>
			) : (
				<NavbarLoggedOutView onAuthentication={onAuthentication} />
			)}
			<Link to={'/privacy'}>Privacy</Link>
		</nav>
	);
};
export default Navbar;
