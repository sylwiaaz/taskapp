import React, { FunctionComponent, useState } from 'react';
import Note from '../Note/Note';
import AddButton from 'components/AddButton/AddButton';
import { removeColumn, editColumnName } from 'store/actions/boardActions';
import { useDispatch, useSelector } from 'react-redux';
import { Droppable, Draggable, DroppableProvided, DraggableProvided } from 'react-beautiful-dnd';
import './column.scss';
import DeleteIcon from '@material-ui/icons/Delete';
import Textarea from 'components/Textarea/Textarea';
import { RootState } from 'store';
import { IColumn, INote } from 'interfaces';

type ColumnProps = {
   id: string,
   index: number,
   boardID: string
}

const Column: FunctionComponent<ColumnProps> = ({ id, index, boardID }) => {

   const dispatch = useDispatch();
   const column = useSelector((state: RootState) => state.columns.find((column: IColumn) => column.id === id))
   const notes = useSelector((state: RootState) => state.notes);

   const [value, setValue] = useState<string>(column ? column.name : '');
   const [openInput, setOpenInput] = useState<boolean>(false);

   const handleRemoveColumn = (): void => {
      dispatch(removeColumn(id, boardID, column.notesByID));
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
         dispatch(editColumnName(id, value));
      }
   };

   const noteList = column && column.notesByID ? column.notesByID.map((noteID: string, index: number) => {
      const noteData = notes.find((note: INote) => note.id === noteID);
      return <Note key={noteID} id={noteID} {...noteData} index={index} columnID={id} boardID={boardID}/>;
   }) : null;

   return (
       column ?
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
                            {column ? column.name : null}
                         </h4>
                     )}

                     <button className="remove-btn col" onClick={handleRemoveColumn}>
                        <DeleteIcon className="trash-icon"/>
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
                               <AddButton columnID={id} btnStyle="create-note"/>
                            </div>
                        )}
                     </Droppable>
                  </div>
              )}
           </Draggable> : null);
};

export default Column;
