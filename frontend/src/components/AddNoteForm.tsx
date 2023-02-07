import { useState } from 'react';
import { Note } from '../models/note';
import * as NotesApi from '../network/notes.api';
import { NoteInput } from '../network/notes.api';
import styles from '../styles/AddNoteForm.module.css';

interface AddNoteFormProps {
	cancelAddNote: () => void;
	onNoteSaved: (note: Note) => void;
}

const AddNoteForm = ({ cancelAddNote, onNoteSaved }: AddNoteFormProps) => {
	const [note, setNote] = useState({
		title: '',
		string: '',
	});

	const onSubmit = async (input: NoteInput) => {
		try {
			const note = await NotesApi.createNote(input);

			console.log(note);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className={styles.addNoteForm}>
			<p>AddNoteForm</p>
			<form onSubmit={() => onSubmit(note)} action='submit'>
				<label htmlFor='Title'>Title</label>
				<input type='text' placeholder='Title' name='title' id='title' />
				<label htmlFor='Description'>Description</label>
				<textarea
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
