import React, { FunctionComponent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './buttons.scss';
import Textarea from './Textarea';
import { addColumn, addNote } from 'store/actions';
import { FaPlus } from 'react-icons/fa';
import { useFirestore } from 'react-redux-firebase';

interface ButtonProps {
   columnId?: string,
   column?: boolean,
   btnStyle: string
}

const AddButton: FunctionComponent<ButtonProps> = ({ columnId, column, btnStyle }) => {

   const firestore = useFirestore();

   const dispatch = useDispatch();
   const userID = useSelector((state: any) => state.firebase.auth.uid);
   // console.log(userID);

   const [formOpen, setFormOpen] = useState<boolean>(false);
   const [textAreaText, setText] = useState<string>('');

   const handleOpenForm = (): void => {
      setFormOpen(true);
   };

   const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
      setText(e.target.value);
   };

   const handleAddColumn = () => {
      if (textAreaText.trim()) {
         dispatch(addColumn(textAreaText, '4q6zLNmCqXyTtE3RPOvk'));
      }
      setText('');
      return;
   };

   const handleAddNote = (): void => {
      if (textAreaText.trim() && columnId) {
         dispatch(addNote(textAreaText, columnId, '4q6zLNmCqXyTtE3RPOvk'));
      }
      setText('');
      return;
   };

   const closeForm = (): void => {
      setFormOpen(false);
      !column ? handleAddNote() : handleAddColumn();
   };

   const renderForm = (): JSX.Element => {
      const placeholder = column ? 'Enter column title' : 'Enter a note text';
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
               onMouseDown={column ? handleAddColumn : handleAddNote}
            >
               {btnTitle}
            </button>
         </div>
      );
   };

   const renderAddButton = (): JSX.Element => {
      const buttonText = column ? 'New column' : 'Create a note';
      return (
         <button className={btnStyle} onClick={handleOpenForm}>
            <FaPlus className="plus-icon"/>
            {buttonText}
         </button>
      );
   };

   return formOpen ? renderForm() : renderAddButton();

};

export default AddButton;
