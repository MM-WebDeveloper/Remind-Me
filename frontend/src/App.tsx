import { useEffect, useState } from 'react';
import { Note } from './models/note';

const App = () => {
	const [notes, setNotes] = useState<Note[]>([]);

	useEffect(() => {
		console.log('happened');
		const getNotes = async () => {
			try {
				const response = await fetch('/api/notes', {
					method: 'GET',
				});
				const notes = await response.json();
				setNotes(notes);
				console.log(notes);
			} catch (error) {
				console.error(error);
			}
		};

		getNotes();
	}, []);

	return <div>{JSON.stringify(notes)}</div>;
};
export default App;
