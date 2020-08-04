import React, { FunctionComponent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './board.scss';
import Column from 'components/Column/Column';
import AddButton from 'components/AddButton/AddButton';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { RouteComponentProps, useParams } from 'react-router-dom';
import { RootState } from 'store';
import { loadBoards, loadColumnsAndNotes, reorderColumns, reorderNotes } from 'store/actions/boardActions';
import { CircularProgress } from '@material-ui/core';
import { IBoard } from 'interfaces';

const Board: FunctionComponent<RouteComponentProps> = (): JSX.Element => {

    const dispatch = useDispatch();
    const { boardID } = useParams();
    const board = useSelector((state: RootState) => state.boards.find((board: IBoard) => board.id === boardID));
    const userID = useSelector((state: RootState) => state.firebase.auth.uid);

    useEffect(() => {
        if (!board) {
            dispatch(loadBoards(userID));
        }
        dispatch(loadColumnsAndNotes(boardID));
    }, []);

    const handleDragEnd = (result: any): void => {
        const { destination, source, draggableId, type } = result;
        if (!destination) {
            return;
        }
        if (type === 'list') {
            dispatch(reorderColumns(boardID, source.index, destination.index));
        } else {
            dispatch(reorderNotes(boardID, draggableId, source.droppableId, source.index, destination.droppableId, destination.index))
        }
    };

    const columnList = board && board.columnsByID ? board.columnsByID.map((columnID: string, index: number) => {
        return (
            <Column key={columnID} id={columnID} index={index} boardID={boardID}/>
        )
    }) : null;

    return (
        board ?
            <div className='board-container'>
                <h3 className='board-title'>{board ? board.boardTitle : null}</h3>
                <DragDropContext onDragEnd={handleDragEnd}>
                    <div className="board">
                        <Droppable direction="horizontal" type="list" droppableId="all-list">
                            {provided => (
                                <div
                                    className="column-container"
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}>
                                    {columnList}
                                    {provided.placeholder}
                                    <AddButton column btnStyle="add-column"/>
                                </div>
                            )}
                        </Droppable>
                    </div>
                </DragDropContext>
            </div>
            : (<div className='loading-wrapper'><CircularProgress size={200}/></div>)
    );
};

export default Board;
