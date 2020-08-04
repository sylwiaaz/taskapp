import React, { FunctionComponent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './buttons.scss';
import Textarea from '../Textarea/Textarea';
import { addColumn, addNote } from 'store/actions/boardActions';
import AddIcon from '@material-ui/icons/Add';
import { useParams } from 'react-router-dom';
import { RootState } from 'store';

interface ButtonProps {
    btnStyle: string,
    columnID?: string,
    column?: boolean
}

const AddButton: FunctionComponent<ButtonProps> = ({ columnID, column, btnStyle }) => {

    const dispatch = useDispatch();
    const { boardID } = useParams();
    const userID = useSelector((state: RootState) => state.firebase.auth.uid);

    const [formOpen, setFormOpen] = useState<boolean>(false);
    const [textAreaText, setText] = useState<string>('');

    const handleOpenForm = (): void => {
        setFormOpen(true);
    };

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
        setText(e.target.value);
    };

    const handleAddColumn = (): void => {
        if (textAreaText.trim()) {
            dispatch(addColumn(userID, textAreaText, boardID));
        }
        setText('');
    };

    const handleAddNote = (): void => {
        if (textAreaText.trim() && columnID) {
            dispatch(addNote(userID, textAreaText, columnID, boardID));
        }
        setText('');
    };

    const closeForm = (): void => {
        setFormOpen(false);
        !column ? handleAddNote() : handleAddColumn();
    };

    const renderForm = (): JSX.Element => {
        const placeholder = column ? 'Enter a column title' : 'Enter a note text';
        const btnTitle = column ? 'Add column' : 'Add note';
        const formStyle = column ? 'column-form' : 'note-form';

        return (
            <div className={formStyle}>
                <Textarea
                    placeholder={placeholder}
                    onBlur={closeForm}
                    value={textAreaText}
                    onChange={handleTextChange}
                />
                <button
                    className="add-btn"
                    onMouseDown={column ? handleAddColumn : handleAddNote}>
                    {btnTitle}
                </button>
            </div>
        );
    };

    const renderAddButton = (): JSX.Element => {
        const buttonText = column ? 'New column' : 'Create a note';
        return (
            <button className={btnStyle} onClick={handleOpenForm}>
                <AddIcon className="plus-icon"/>
                {buttonText}
            </button>
        );
    };

    return formOpen ? renderForm() : renderAddButton();
};

export default AddButton;
