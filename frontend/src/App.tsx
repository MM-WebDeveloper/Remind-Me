import { useEffect, useState } from 'react';
import Note from './components/Note';
import { Note as NoteModel } from './models/note';
import * as NotesApi from './network/notes.api';

const App = () => {
	const [notes, setNotes] = useState<NoteModel[]>([]);

	useEffect(() => {
		console.log('happened');
		const getNotes = async () => {
			try {
				const notes = await NotesApi.fetchNotes();
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
