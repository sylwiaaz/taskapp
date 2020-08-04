import { Action } from 'redux';
import { INote } from './notes';

interface IColumn {
    id: string,
    authorID: string,
    boardID: string,
    name: string,
    notesByID: string[],
    notes?: INote[]
}

interface IAddColumnAction extends Action {
    type: 'ADD_COLUMN'
    payload: { column: IColumn }
}

interface IEditColumnNameAction extends Action {
    type: 'EDIT_COLUMN_NAME'
    payload: { columnID: string, columnName: string }
}

interface IRemoveColumnAction extends Action {
    type: 'REMOVE_COLUMN'
    payload: { columnID: string, boardID: string, notesIDs: string[] }
}

interface IReorderNotes extends Action {
    type: 'REORDER_COLUMN'
    payload: { sourceIndex: number, destinationIndex: number, sourceID: string, destinationID: string }
}

export { IColumn, IAddColumnAction, IEditColumnNameAction, IRemoveColumnAction, IReorderNotes };
