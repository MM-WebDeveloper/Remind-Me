import LoggedInView from '../components/views/LoggedInView';
import LoggedOutView from '../components/views/LoggedOutView';
import { User } from '../models/user';

interface NotesPageProps {
	authenticatedUser: User | null;
}

const NotesPage = ({ authenticatedUser }: NotesPageProps) => {
	return <>{authenticatedUser ? <LoggedInView /> : <LoggedOutView />}</>;
};

export default NotesPage;
