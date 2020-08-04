import React, { FunctionComponent, useState } from 'react';
import { removeNote, handleLike, editNoteContent } from 'store/actions/boardActions';
import { useDispatch, useSelector } from 'react-redux';
import Textarea from 'components/Textarea/Textarea';
import './note.scss';
import { Draggable, DraggableProvided } from 'react-beautiful-dnd';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import CloseIcon from '@material-ui/icons/Close';
import { RootState } from 'store';


type NoteProps = {
   id: string,
   columnID: string,
   index: number,
   boardID: string,
   content: string,
   likes: string[]
}

const Note: FunctionComponent<NoteProps> = (props: NoteProps) => {
   const { id, columnID, index, content, likes } = props;

   const dispatch = useDispatch();
   const userID = useSelector((state: RootState) => state.firebase.auth.uid);

   const [isLikedNote, setLikedNote] = useState<boolean>(!!likes.find((likeAuthor: string) => likeAuthor === userID));
   const [value, setValue] = useState<string>(content);
   const [openInput, setOpenInput] = useState<boolean>(false);


   const handleRemoveNote = (): void => {
      dispatch(removeNote(id, columnID));
   };

   const handleAddLike = (): void => {
      dispatch(handleLike(id, userID));
      setLikedNote(!isLikedNote);
   };

   const handleClick = (): void => {
      setOpenInput(true);
   };

   const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
      setValue(e.target.value);
   };

   const handleBlur = (): void => {
      setOpenInput(false);
      if (value.trim()) {
         dispatch(editNoteContent(id, value));
      }
   };

   return (
       <Draggable draggableId={id} index={index}>
          {(provided: DraggableProvided) => (
              <div
                  className="note"
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}>
                 {openInput ?
                     <Textarea
                         value={value}
                         onBlur={handleBlur}
                         onChange={handleOnChange}/>
                     : <p className="note-content" onClick={handleClick}>
                        {content}
                     </p>}
                 <div className="buttons">
                    <button onClick={handleRemoveNote} className="remove-btn">
                       <CloseIcon className="icon" style={{ fontSize: 16 }}/>
                    </button>
                    <button onClick={handleAddLike} className='like-btn'>
                       {likes && likes.length ? <span className="likes-amount">{likes.length}</span> : null}
                       <ThumbUpIcon
                           className={isLikedNote ? 'icon liked-icon' : 'icon'}
                           style={{ fontSize: 16 }}/>
                    </button>
                 </div>
              </div>
          )}
       </Draggable>
   );
};

export default Note;
