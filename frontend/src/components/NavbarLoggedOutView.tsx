interface NavbarLoggedOutViewProps {
	onRegister: () => void;
	onLogin: () => void;
}

const NavbarLoggedOutView = ({
	onRegister,
	onLogin,
}: NavbarLoggedOutViewProps) => {
	return (
		<>
			<button onClick={onRegister}>Register</button>
			<button onClick={onLogin}>Login</button>
		</>
	);
};
export default NavbarLoggedOutView;
