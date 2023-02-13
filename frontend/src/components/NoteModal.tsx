import { useState } from 'react';
import { Note } from '../models/note';
import * as NotesApi from '../network/notes.api';
import styles from '../styles/NoteModal.module.css';

interface NoteModalProps {
	noteToEdit: Note | null;
	cancelNoteModal: () => void;
	onNoteAdded: (note: Note) => void;
	onNoteEdited: (newNote: Note) => void;
}

const NoteModal = ({
	noteToEdit,
	cancelNoteModal,
	onNoteAdded,
	onNoteEdited,
}: NoteModalProps) => {
	const [note, setNote] = useState({
		title: noteToEdit?.title || '',
		text: noteToEdit?.text || '',
	});
	const [addError, setAddError] = useState<string | null>(null);

	const onSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		let newNote;
		try {
			if (noteToEdit) {
				newNote = await NotesApi.updateNote(noteToEdit._id, note);
				onNoteEdited(newNote);
			} else {
				newNote = await NotesApi.createNote(note);
				onNoteAdded(newNote);
			}

			cancelNoteModal();
		} catch (error) {
			let message = 'Unknown Error';
			if (error instanceof Error) message = error.message;
			setAddError(message);
		}
	};

	return (
		<div className={styles.noteModal}>
			{noteToEdit ? <p>Edit Note</p> : <p>Add Note</p>}
			<form id='noteMutation' onSubmit={(e) => onSubmit(e)} action='submit'>
				<label htmlFor='Title'>Title</label>
				<input
					onChange={(e) => setNote({ ...note, title: e.target.value })}
					type='text'
					placeholder='Title'
					name='title'
					id='title'
					value={note.title}
				/>
				<label htmlFor='Textn'>Text</label>
				<textarea
					onChange={(e) => setNote({ ...note, text: e.target.value })}
					placeholder='Text'
					name='text'
					id='text'
					value={note.text}
				/>
				{addError && <p>{addError}</p>}
				<button onClick={cancelNoteModal}>Cancel</button>
				<button id='noteMutation' type='submit'>
					{noteToEdit ? 'Edit' : 'Submit'}
				</button>
			</form>
		</div>
	);
};

export default NoteModal;
