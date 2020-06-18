import React, { FunctionComponent, useState } from 'react';
import Note from '../Note/Note';
import AddButton from 'components/Buttons/AddButton';
import { removeColumn, editColumnName } from 'store/actions';
import { useDispatch } from 'react-redux';
import { Droppable, Draggable, DroppableProvided, DraggableProvided } from 'react-beautiful-dnd';
import './column.scss';
import { FaTrashAlt } from 'react-icons/fa';
import Textarea from 'components/Buttons/Textarea';
import { NoteType } from 'store/reducers/boardReducer';

type ColumnProps = {
   name: string,
   id: string,
   notes: any[],
   index: number,
   boardID: string
}


//b4MZ0T6B22knMX5UPUME
//l6z8xwmeKaAfamJVFWqF
const Column: FunctionComponent<ColumnProps> = ({ name, id, notes, index, boardID }) => {


   const dispatch = useDispatch();

   const [value, setValue] = useState<string>(name);
   const [openInput, setOpenInput] = useState<boolean>(false);

   const handleRemoveColumn = (): void => {
      dispatch(removeColumn(id, '4q6zLNmCqXyTtE3RPOvk'));
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
         dispatch(editColumnName(id, value, boardID));
      }
   };

   const noteList = notes ? notes.map((note, index) => {
         return <Note key={note.id} {...note} index={index} columnID={id} boardID={boardID}/>;
      }
   ) : null;

   return (
      <Draggable draggableId={id} index={index}>
         {(provided: DraggableProvided) => (
            <div
               className="column-board"
               {...provided.draggableProps}
               ref={provided.innerRef}
               {...provided.dragHandleProps}
            >
               {openInput ? (
                  <Textarea
                     value={value}
                     onChange={handleOnChange}
                     onBlur={handleBlur}
                  />
               ) : (
                  <h4 className="column-name" onClick={handleClick}>
                     {name}
                  </h4>
               )}

               <button className="remove-btn col" onClick={handleRemoveColumn}>
                  <FaTrashAlt className="trash-icon"/>
               </button>
               <Droppable droppableId={id}>
                  {(provided: DroppableProvided) => (
                     <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="notes-container"
                     >
                        {noteList}
                        {provided.placeholder}
                        <AddButton columnId={id} btnStyle="create-note"/>
                     </div>
                  )}
               </Droppable>
            </div>
         )}
      </Draggable>
   );
};

export default Column;
