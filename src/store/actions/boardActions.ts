import { IBoard } from 'interfaces/board';
import {
   createBoard,
   createColumn,
   createNote,
   deleteBoard,
   deleteColumn,
   deleteNote,
   editColumn,
   editNoteText,
   getBoards,
   getColumnsAndNotes,
   handleLikeInNote,
   updateColumnsOrder,
   updateNotesOrder
} from 'firebase/apiMethods';
import { AppDispatch, AppThunk } from '../index';


// BOARD ACTIONS
export const loadBoards = (authorID: string): AppThunk => {
   return async (dispatch: AppDispatch) => {
      const boards: IBoard[] = await getBoards(authorID);
      dispatch({
         type: 'LOAD_BOARDS',
         payload: { boards }
      });
   };
};

// export const loadBoard = (id: string): AppThunk => {
//     return async (dispatch: AppDispatch) => {
//         const board = await getBoard(id);
//         dispatch({
//             type: 'LOAD_BOARD',
//             payload: { board }
//         });
//     };
// };

export const addBoard = (authorID: string, boardTitle: string): AppThunk => {
   return async (dispatch: AppDispatch) => {
      const board = await createBoard(authorID, boardTitle);
      dispatch({
         type: 'ADD_BOARD',
         payload: { boardTitle, authorID, id: board.id, columnsByID: [] }
      });
   };
};

export const removeBoard = (boardID: string): AppThunk => {
   return async (dispatch: AppDispatch) => {
      await deleteBoard(boardID);
      dispatch({
         type: 'REMOVE_BOARD',
         payload: { boardID }
      });
   }
}

export const reorderColumns = (boardID: string, sourceIndex: number, destinationIndex: number): AppThunk => {
   return async (dispatch: AppDispatch) => {
      dispatch({
         type: 'REORDER_COLUMNS',
         payload: { boardID, sourceIndex, destinationIndex }
      });
      await updateColumnsOrder(boardID, sourceIndex, destinationIndex);
   };
};

export const loadColumnsAndNotes = (boardID: string): AppThunk => {
   return async (dispatch: AppDispatch) => {
      const data = await getColumnsAndNotes(['columns', 'notes'], boardID);
      const [columns, notes] = data;
      dispatch({
         type: 'LOAD_DATA',
         payload: { columns, notes }
      });
   }
}


// COLUMN ACTIONS

// export const loadColumns = (authorID: string, boardID: string): AppThunk => {
//     return async (dispatch: AppDispatch) => {
//         const columns = await getColumns(authorID, boardID);
//             dispatch({
//                 type: 'LOAD_DATA',
//                 payload: { columns }
//             });
//     };
// };

export const addColumn = (authorID: string, name: string, boardID: string): AppThunk => {
   return async (dispatch: AppDispatch) => {
      const column = await createColumn(authorID, name, boardID);
      dispatch({
         type: 'ADD_COLUMN',
         payload: { column: { name, id: column.id, boardID, notesByID: [] } }
      });
   };
};

export const editColumnName = (columnID: string, columnName: string): AppThunk => {
   return async (dispatch: AppDispatch) => {
      await editColumn(columnName, columnID)
      dispatch({
         type: 'EDIT_COLUMN_NAME',
         payload: { columnID, columnName }
      });
   };
};

export const removeColumn = (columnID: string, boardID: string, notesIDs: string[]): AppThunk => {
   return async (dispatch: AppDispatch) => {
      await deleteColumn(columnID, boardID, notesIDs);
      dispatch({
         type: 'REMOVE_COLUMN',
         payload: { columnID, boardID, notesIDs }
      });
   };
};

export const reorderNotes = (boardID: string, noteID: string, sourceID: string, sourceIndex: number, destinationID: string, destinationIndex: number): AppThunk => {
   return async (dispatch: AppDispatch) => {
      dispatch({
         type: 'REORDER_NOTES',
         payload: { sourceIndex, destinationIndex, sourceID, destinationID }
      });
      await updateNotesOrder(boardID, noteID, sourceID, destinationID, sourceIndex, destinationIndex);
   };
};


// NOTE ACTIONS

// export const loadNotes = (authorID: string, boardID: string): AppThunk => {
//     return async (dispatch: AppDispatch) => {
//         const notes = await getNotes(authorID, boardID);
//             dispatch({
//                 type: 'LOAD_DATA',
//                 payload: { notes }
//             });
//     };
// };

export const addNote = (authorID: string, content: string, columnID: string, boardID: string): AppThunk => {
   return async (dispatch: AppDispatch) => {
      const note = await createNote(authorID, content, columnID, boardID)
      dispatch({
         type: 'ADD_NOTE',
         payload: { note: { content, columnID, id: note.id, likes: [], boardID } }
      });
   };
};

export const editNoteContent = (noteID: string, content: string): AppThunk => {
   return async (dispatch: AppDispatch) => {
      await editNoteText(noteID, content)
      dispatch({
         type: 'EDIT_NOTE_CONTENT',
         payload: { noteID, content }
      });
   };
};

export const removeNote = (noteID: string, columnID: string): AppThunk => {
   return async (dispatch: AppDispatch) => {
      await deleteNote(noteID, columnID)
      dispatch({
         type: 'REMOVE_NOTE',
         payload: { noteID, columnID }
      });
   };
};

export const handleLike = (noteID: string, likeAuthor: string): AppThunk => {
   return async (dispatch: AppDispatch) => {
      await handleLikeInNote(noteID, likeAuthor);
      dispatch({
         type: 'HANDLE_LIKE',
         payload: { noteID, likeAuthor }
      })
   }
};
