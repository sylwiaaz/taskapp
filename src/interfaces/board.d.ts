import { Action } from 'redux';
import { INote } from './notes';
import { IColumn } from './columns';

interface IBoard {
    authorID: string,
    id: string,
    boardTitle: string,
    columnsByID: string[],
    columns?: IColumn[]
}

interface ILoadBoardsAction extends Action {
    type: 'LOAD_BOARDS'
    payload: { boards: IBoard[] }
}


interface IAddBoardAction extends Action {
    type: 'ADD_BOARD'
    payload: { boardTitle: string, authorID: string, id: string, columnsByID: string[] }
}

interface IRemoveBoardAction extends Action {
    type: 'REMOVE_BOARD'
    payload: { boardID: string }
}


interface IReorderColumnsAction extends Action {
    type: 'REORDER_COLUMNS',
    payload: { boardID: string, sourceIndex: number, destinationIndex: number }
}

interface ILoadColumnsAndNotes extends Action {
    type: 'LOAD_DATA',
    payload: { columns: IColumn[], notes: INote[] }
}

export { IBoard, ILoadBoardsAction, IAddBoardAction, IRemoveBoardAction,  IReorderColumnsAction, ILoadColumnsAndNotes };
