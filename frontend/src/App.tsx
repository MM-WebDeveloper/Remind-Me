import { useEffect, useState } from 'react';
import AddNoteForm from './components/AddNoteForm';
import Note from './components/Note';
import { Note as NoteModel } from './models/note';
import * as NotesApi from './network/notes.api';

const App = () => {
	const [notes, setNotes] = useState<NoteModel[]>([]);
	const [showAddNoteForm, setShowAddNoteForm] = useState(false);

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
		<>
			<button onClick={() => setShowAddNoteForm(true)}>Add new note</button>
			<div>
				{notes.map((note) => (
					<Note key={note._id} note={note} />
				))}
			</div>
			{showAddNoteForm && (
				<AddNoteForm
					onNoteSaved={() => console.log('Hi')}
					cancelAddNote={() => setShowAddNoteForm(false)}
				/>
			)}
		</>
	);
};
export default App;
