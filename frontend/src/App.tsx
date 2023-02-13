import { useEffect, useState } from 'react';
import NoteModal from './components/NoteModal';
import Note from './components/Note';
import { Note as NoteModel } from './models/note';
import * as NotesApi from './network/notes.api';

const App = () => {
	const [notes, setNotes] = useState<NoteModel[]>([]);
	const [showNoteModal, setShowNoteModal] = useState(false);
	const [noteToEdit, setNoteToEdit] = useState<NoteModel | null>(null);

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

	const onNoteAdded = (note: NoteModel) => {
		const updatedNotes = [...notes, note];
		setNotes(updatedNotes);
	};

	const onNoteEdited = async (note: NoteModel) => {
		setNotes(
			notes.map((existingNote) =>
				existingNote._id === note._id ? note : existingNote
			)
		);
		setNoteToEdit(null);
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

	const editNote = async (note: NoteModel) => {
		setNoteToEdit(note);
		setShowNoteModal(true);
	};

	return (
		<>
			<button onClick={() => setShowNoteModal(true)}>Add new note</button>
			<div>
				{notes.map((note) => (
					<Note
						key={note._id}
						editNote={editNote}
						note={note}
						deleteNote={deleteNote}
					/>
				))}
			</div>
			{showNoteModal && (
				<NoteModal
					noteToEdit={noteToEdit}
					onNoteAdded={onNoteAdded}
					onNoteEdited={onNoteEdited}
					cancelNoteModal={() => {
						setShowNoteModal(false);
						setNoteToEdit(null);
					}}
				/>
			)}
		</>
	);
};
export default App;
