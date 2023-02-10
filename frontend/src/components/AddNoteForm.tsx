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
		description: '',
	});

	const onSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const newNote = await NotesApi.createNote(note);
			onNoteSaved(newNote);
			cancelAddNote();
		} catch (error) {
			console.log(error);
			alert(error);
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
				<label htmlFor='Description'>Description</label>
				<textarea
					onChange={(e) => setNote({ ...note, description: e.target.value })}
					placeholder='Description'
					name='description'
					id='description'
				/>
				<button onClick={cancelAddNote}>Cancel</button>
				<button type='submit'>Submit</button>
			</form>
		</div>
	);
};

export default AddNoteForm;
