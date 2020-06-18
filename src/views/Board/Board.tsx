import React, { FunctionComponent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './board.scss';
import Column from 'components/Column/Column';
import AddButton from 'components/Buttons/AddButton';
import { sort } from 'store/actions';
import { ColumnType } from 'store/reducers/boardReducer';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { loadBoard, loadBoards } from 'store/actions/boardActions';
import { RouteComponentProps, useParams } from 'react-router-dom';
import { RootState } from '../../store';
import { getBoard } from '../../firebase/apiMethods';


const Board: FunctionComponent<RouteComponentProps> = (props: RouteComponentProps): JSX.Element => {

   const dispatch = useDispatch();
   const { boardID } = useParams();
   //

   const board = useSelector((state: RootState) => state.board.find((board: any) => board.id === boardID));
   // const [columns, setColumns] = useState<any>([]);
   // const [loading, setLoading] = useState<boolean>(true);

   // useEffect(() => {
   //    // dispatch()
   //    setLoading(true);
   //   // dispatch(loadBoard(boardID));
   //    setLoading(false);
   // }, []);

   // const columns: any[] = [];
   // console.log(columns);

   const handleDragEnd = (result: any): void => {
      const { destination, source, draggableId, type } = result;
      if (!destination) {
         return;
      }
      dispatch(
         sort(
            source.droppableId,
            destination.droppableId,
            source.index,
            destination.index,
            draggableId,
            type
         )
      );
   };

   const columnList = board.columns.map((column: any, index: number) => {
      return (
         <Column {...column} key={column.id} notes={column.notes} index={index} boardID={boardID}/>
      )
   });

   return (
         <div>
            <h3 className='board-title'>Board title</h3>
            <DragDropContext onDragEnd={handleDragEnd}>
               <div className="board">
                  <Droppable direction="horizontal" type="list" droppableId="all-list">
                     {provided => (
                        <div
                           className="column-container"
                           ref={provided.innerRef}
                           {...provided.droppableProps}
                        >
                           {columnList}
                           {provided.placeholder}
                           <AddButton column btnStyle="add-column"/>
                           <div
                              style={{
                                 marginLeft: '40px',
                                 width: '30px',
                                 opacity: 0
                              }}
                           >
                              null
                           </div>
                        </div>
                     )}
                  </Droppable>
               </div>
            </DragDropContext>

         </div>
   );
};

export default Board;
