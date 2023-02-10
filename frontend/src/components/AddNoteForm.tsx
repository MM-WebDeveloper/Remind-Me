import { useState } from 'react';
import { Note } from '../models/note';
import * as NotesApi from '../network/notes.api';
import styles from '../styles/AddNoteForm.module.css';

interface AddNoteFormProps {
	cancelAddNote: () => void;
	onNoteSaved: (note: Note) => void;
}

const AddNoteForm = ({ cancelAddNote, onNoteSaved }: AddNoteFormProps) => {
	const [note, setNote] = useState({
		title: '',
		text: '',
	});
	const [addError, setAddError] = useState<string | null>(null);

	const onSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const newNote = await NotesApi.createNote(note);
			console.log(newNote);
			onNoteSaved(newNote);
			cancelAddNote();
		} catch (error) {
			let message = 'Unknown Error';
			if (error instanceof Error) message = error.message;
			setAddError(message);
		}
	};

	return (
		<div className={styles.addNoteForm}>
			<p>AddNoteForm</p>
			<form onSubmit={(e) => onSubmit(e)} action='submit'>
				<label htmlFor='Title'>Title</label>
				<input
					onChange={(e) => setNote({ ...note, title: e.target.value })}
					type='text'
					placeholder='Title'
					name='title'
					id='title'
				/>
				<label htmlFor='Textn'>Text</label>
				<textarea
					onChange={(e) => setNote({ ...note, text: e.target.value })}
					placeholder='Text'
					name='text'
					id='text'
				/>
				{addError && <p>{addError}</p>}
				<button onClick={cancelAddNote}>Cancel</button>
				<button type='submit'>Submit</button>
			</form>
		</div>
	);
};

export default AddNoteForm;
