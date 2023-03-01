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
	const [entryError, setEntryError] = useState<string | null>();

	const displayRegisterFields = () => {
		setEntryError(null);
		setTypeOfEntry(true);
		setShowEntryModal(true);
	};

	const displayLoginFields = () => {
		setEntryError(null);
		setTypeOfEntry(false);
		setShowEntryModal(true);
	};

	const displayEntryError = (message: string) => {
		setEntryError(message);
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
					displayEntryError={displayEntryError}
					entryError={entryError!}
					onAuthentication={onAuthentication}
					cancelEntryModal={() => setShowEntryModal(false)}
				/>
			)}
		</>
	);
};
export default NavbarLoggedOutView;
