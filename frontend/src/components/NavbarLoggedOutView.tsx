import { useState } from 'react';
import { User } from '../models/user';
import EntryModal from './EntryModal';

interface NavbarLoggedOutViewProps {
	onAuthentication: (user: User) => void;
}

const NavbarLoggedOutView = ({
	onAuthentication,
}: NavbarLoggedOutViewProps) => {
	const [showEntryModal, setShowEntryModal] = useState(false);
	const [typeOfEntry, setTypeOfEntry] = useState(false);

	const displayRegisterFields = () => {
		setTypeOfEntry(true);
		setShowEntryModal(true);
	};

	const displayLoginFields = () => {
		setTypeOfEntry(false);
		setShowEntryModal(true);
	};

	return (
		<>
			<div>
				<button onClick={displayRegisterFields}>Register</button>
				<button onClick={displayLoginFields}>Login</button>
			</div>
			{showEntryModal && (
				<EntryModal
					typeOfEntry={typeOfEntry}
					onAuthentication={onAuthentication}
					cancelEntryModal={() => setShowEntryModal(false)}
				/>
			)}
		</>
	);
};
export default NavbarLoggedOutView;
