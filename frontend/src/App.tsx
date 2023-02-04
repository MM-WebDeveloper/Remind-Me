import { useEffect, useState } from 'react';
import Note from './components/Note';
import { Note as NoteModel } from './models/note';

const App = () => {
	const [notes, setNotes] = useState<NoteModel[]>([]);

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

	return (
		<div>
			{notes.map((note) => (
				<Note key={note._id} note={note} />
			))}
		</div>
	);
};
export default App;
