import React, { FunctionComponent, useState } from 'react';
import {
   removeNote,
   handleLike,
   editNoteContent
} from 'store/actions';
import { useDispatch } from 'react-redux';
import Textarea from 'components/Buttons/Textarea';
import './note.scss';
import { Draggable, DraggableProvided } from 'react-beautiful-dnd';
import { AiFillLike } from 'react-icons/ai';
import { MdClose } from 'react-icons/md';


type NoteProps = {
   id: string,
   columnID: string,
   content: string,
   index: number,
   likes: string[],
   boardID: string
}

const Note: FunctionComponent<NoteProps> = (props: NoteProps) => {
   const { id, columnID, content, index, likes, boardID } = props;
   const dispatch = useDispatch();

   const [isLikedNote, setLikedNote] = useState<boolean>(false);
   const [value, setValue] = useState<string>(content);
   const [openInput, setOpenInput] = useState<boolean>(false);

   const handleRemoveNote = () => {
      dispatch(removeNote(id, columnID, boardID));
   };

   const handleAddLike = () => {
      dispatch(handleLike(id, 'user1'));
      setLikedNote(!isLikedNote);
   };

   const handleClick = () => {
      setOpenInput(true);
   };

   const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
      setValue(e.target.value);
   };

   const handleBlur = (): void => {
      setOpenInput(false);
      if (value.trim()) {
         dispatch(editNoteContent(columnID, id, value, boardID));
      }
   };

   return (
      <Draggable draggableId={id} index={index}>
         {(provided: DraggableProvided) => (
            <div
               className="note"
               ref={provided.innerRef}
               {...provided.draggableProps}
               {...provided.dragHandleProps}
            >
               {openInput ? (
                  <Textarea
                     value={value}
                     onBlur={handleBlur}
                     onChange={handleOnChange}
                  />
               ) : (
                  <p className="note-content" onClick={handleClick}>
                     {content}
                  </p>
               )}
               <div className="buttons">
                  <button onClick={handleRemoveNote} className="remove-btn">
                     <MdClose className="icon"/>
                  </button>
                  <button onClick={handleAddLike} className={'like-btn'}>
                     { likes && likes.length ? (
                        <span className="likes-amount">{likes.length}</span>
                     ) : null}
                     <AiFillLike
                        className={isLikedNote ? 'icon liked-icon' : 'icon'}
                     />
                  </button>
               </div>
            </div>
         )}
      </Draggable>
   );
};

export default Note;
