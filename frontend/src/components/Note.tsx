import styles from '../styles/Note.module.css';
import { Note as NoteModel } from '../models/note';
import { formatDate } from '../utils/formatDate';
import { faTrash, faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface NoteProps {
	note: NoteModel;
	deleteNote: (note: NoteModel) => void;
	editNote: (note: NoteModel) => void;
}

const Note = ({ note, deleteNote, editNote }: NoteProps) => {
	const { title, text, createdAt, updatedAt } = note;

	let createdUpdatedText: string;

	if (updatedAt > createdAt) {
		createdUpdatedText = 'Updated: ' + formatDate(updatedAt);
	} else {
		createdUpdatedText = 'Created: ' + formatDate(createdAt);
	}

	return (
		<div className={styles.card}>
			<button
				onClick={(e) => {
					deleteNote(note);
					e.stopPropagation();
				}}
				className={[styles.button, styles.red].join(' ')}
			>
				<FontAwesomeIcon icon={faTrash} />
			</button>
			<button
				onClick={(e) => {
					editNote(note);
					e.stopPropagation();
				}}
				className={[styles.button, styles.green].join(' ')}
			>
				<FontAwesomeIcon icon={faPen} />
			</button>
			<p>Title: {title}</p>
			<p>Text: {text}</p>
			<p>{createdUpdatedText}</p>
		</div>
	);
};
export default Note;
