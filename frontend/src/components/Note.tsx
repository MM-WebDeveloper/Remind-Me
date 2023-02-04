import { Note as NoteModel } from '../models/note';

interface NoteProps {
	note: NoteModel;
}

const Note = ({ note }: NoteProps) => {
	const { title, text, createdAt, updatedAt } = note;
	return (
		<div style={{ border: '1px solid black' }}>
			<p>Title: {title}</p>
			<p>Description: {text}</p>
			<p>Created: {createdAt}</p>
			<p>Last Updated: {updatedAt}</p>
		</div>
	);
};
export default Note;
