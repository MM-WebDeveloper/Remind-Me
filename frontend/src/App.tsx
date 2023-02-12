import { useEffect, useState } from 'react';
import AddNoteForm from './components/AddNoteForm';
import Note from './components/Note';
import { Note as NoteModel } from './models/note';
import * as NotesApi from './network/notes.api';

const App = () => {
	const [notes, setNotes] = useState<NoteModel[]>([]);
	const [showAddNoteForm, setShowAddNoteForm] = useState(false);

	useEffect(() => {
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

	const onNoteSaved = (note: NoteModel) => {
		const updatedNotes = [...notes, note];
		setNotes(updatedNotes);
	};

	const deleteNote = async (note: NoteModel) => {
		try {
			await NotesApi.deleteNote(note._id);
			const updatedNotes = notes.filter(
				(existingNote) => existingNote._id !== note._id
			);
			setNotes(updatedNotes);
		} catch (error) {
			console.error(error);
			alert(error);
		}
	};

	return (
		<>
			<button onClick={() => setShowAddNoteForm(true)}>Add new note</button>
			<div>
				{notes.map((note) => (
					<Note key={note._id} note={note} deleteNote={deleteNote} />
				))}
			</div>
			{showAddNoteForm && (
				<AddNoteForm
					onNoteSaved={onNoteSaved}
					cancelAddNote={() => setShowAddNoteForm(false)}
				/>
			)}
		</>
	);
};
export default App;
