import styles from '../styles/Note.module.css';
import { Note as NoteModel } from '../models/note';
import { formatDate } from '../utils/formatDate';

interface NoteProps {
	note: NoteModel;
}

const Note = ({ note }: NoteProps) => {
	const { title, text, createdAt, updatedAt } = note;

	let createdUpdatedText: string;

	if (updatedAt > createdAt) {
		createdUpdatedText = 'Updated: ' + formatDate(updatedAt);
	} else {
		createdUpdatedText = 'Created: ' + formatDate(createdAt);
	}

	return (
		<div className={styles.card}>
			<p>Title: {title}</p>
			<p>Text: {text}</p>
			<p>{createdUpdatedText}</p>
		</div>
	);
};
export default Note;
