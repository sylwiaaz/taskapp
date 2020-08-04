import { Action } from 'redux';

interface INote {
    id: string,
    authorID: string,
    boardID: string,
    content: string,
    columnID: string,
    likes: string[]
}

interface IAddNoteAction extends Action {
    type: 'ADD_NOTE'
    payload: { note: INote }
}

interface IEditNoteContentAction extends Action {
    type: 'EDIT_NOTE_CONTENT'
    payload: { noteID: string, content: string }
}

interface IRemoveNoteAction extends Action {
    type: 'REMOVE_NOTE'
    payload: { noteID: string, columnID: string }
}

interface IHandleLikeAction extends Action {
    type: 'HANDLE_LIKE'
    payload: { noteID: string, likeAuthor: string }
}

export { INote, IAddNoteAction, IEditNoteContentAction, IRemoveNoteAction, IHandleLikeAction };
