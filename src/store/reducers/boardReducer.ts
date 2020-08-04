import { createReducer } from '@reduxjs/toolkit';
import {
   IBoard,
   IColumn,
   IAddBoardAction,
   IAddColumnAction,
   IAddNoteAction,
   IEditColumnNameAction,
   IEditNoteContentAction,
   IHandleLikeAction,
   ILoadBoardsAction,
   ILoadColumnsAndNotes,
   IRemoveBoardAction, IRemoveColumnAction,
   IRemoveNoteAction,
   IReorderColumnsAction, IReorderNotes,
   INote
} from 'interfaces';


const initialState: any[] = [];


// BOARDS
const loadBoards = (state: IBoard[], action: ILoadBoardsAction) => {
   const { boards } = action.payload;
   return boards;
};

const addBoard = (state: IBoard[], action: IAddBoardAction) => {
   return [...state, { ...action.payload }]
};

const removeBoard = (state: IBoard[], action: IRemoveBoardAction) => {
   const { boardID } = action.payload;
   return state.filter((boardItem: any) => boardItem.id !== boardID)
}

// const loadBoard = (state: Board[], action: any) => {
//     const { board } = action.payload;
//     return board;
// };

const addColumnWithinBoard = (state: IBoard[], action: IAddColumnAction) => {
   const { id, boardID } = action.payload.column;

   return state.map((board: IBoard) => {
      if (board.id === boardID) {
         return { ...board, columnsByID: [...board.columnsByID, id] }
      } else {
         return board;
      }
   })
};

const removeColumnWithinBoard = (state: IBoard[], action: IRemoveColumnAction) => {
   const { columnID, boardID } = action.payload;

   return state.map((board: IBoard) => {
      if (board.id === boardID) {
         return { ...board, columnsByID: board.columnsByID.filter((columnId: string) => columnID !== columnId) }
      }
      return board;
   })
};

const reorderColumns = (state: IBoard[], action: IReorderColumnsAction) => {
   const { boardID, sourceIndex, destinationIndex } = action.payload;
   return state.map((board: IBoard) => {
      if (board.id === boardID) {
         let newColumnList = [...board.columnsByID];
         const column = newColumnList.splice(sourceIndex, 1);
         newColumnList.splice(destinationIndex, 0, ...column);
         return { ...board, columnsByID: newColumnList };
      } else {
         return board;
      }
   })
};


// COLUMNS
const loadColumns = (state: IColumn[], action: ILoadColumnsAndNotes) => {
   const { columns } = action.payload;
   return columns;
};

const addNewColumn = (state: IColumn[], action: IAddColumnAction) => {
   return [...state, action.payload.column];
};

const removeColumn = (state: IColumn[], action: IRemoveColumnAction) => {
   return state.filter((column: IColumn) => column.id !== action.payload.columnID);
};

const editColumnName = (state: IColumn[], action: IEditColumnNameAction) => {
   const { columnID, columnName } = action.payload;
   return state.map((column: IColumn) => {
      if (column.id === columnID && column.name !== columnName) {
         return { ...column, name: columnName };
      }
      return { ...column };
   });
};

const addNoteWithinColumn = (state: IColumn[], action: IAddNoteAction) => {
   const { columnID, id } = action.payload.note;
   return state.map((column: IColumn) => {
      if (column.id === columnID) {
         return { ...column, notesByID: [...column.notesByID, id] }
      }
      return column;
   });
};

const deleteNoteWithinColumn = (state: IColumn[], action: IRemoveNoteAction) => {
   const { columnID, noteID } = action.payload;
   return state.map((column: IColumn) => {
      if (column.id === columnID) {
         const newNotes = column.notesByID.filter(note => note !== noteID);
         return { ...column, notesByID: newNotes }
      }
      return column;
   })
}

const reorderNotes = (state: IColumn[], action: IReorderNotes) => {
   const { sourceIndex, destinationIndex, sourceID, destinationID } = action.payload;

   const columnStart = state.find(column => column.id === sourceID);
   if (!columnStart) return;
   const newNotesList = [...columnStart.notesByID];
   const [note] = newNotesList.splice(sourceIndex, 1);
   return state.map((column: IColumn) => {
          if (column.id === sourceID && sourceID === destinationID) {
             // drag and drop note in same column
             newNotesList.splice(destinationIndex, 0, note);
             return { ...column, notesByID: newNotesList };
          } else if (column.id === sourceID && sourceID !== destinationID) {
             // drag and drop note between different columns
             return { ...column, notesByID: newNotesList };
          } else if (column.id === destinationID && sourceID !== destinationID) {
             // drag and drop note between different columns
             const destinationNotesList = [...column.notesByID];
             destinationNotesList.splice(destinationIndex, 0, note);
             return { ...column, notesByID: destinationNotesList };
          }
          return column;
       }
   )
}

// NOTES
const loadNotes = (state: INote[], action: ILoadColumnsAndNotes) => {
   const { notes } = action.payload;
   return notes;
}

const addNewNote = (state: INote[], action: IAddNoteAction) => {
   const { note } = action.payload;
   return [...state, note];
};

const removeNote = (state: INote[], action: IRemoveNoteAction) => {
   return state.filter((note: INote) => note.id !== action.payload.noteID);
};

const likeHandle = (state: INote[], action: IHandleLikeAction) => {
   const { noteID, likeAuthor } = action.payload;
   return state.map((note: INote) => {
      if (note.id === noteID) {
         let newLikesArray = [...note.likes];
         if (!newLikesArray.includes(likeAuthor)) {
            newLikesArray.push(likeAuthor);
         } else {
            newLikesArray = newLikesArray.filter(author => author !== likeAuthor);
         }
         return { ...note, likes: newLikesArray };
      } else {
         return note;
      }
   });
};

const editNoteContent = (state: INote[], action: IEditNoteContentAction) => {
   const { noteID, content } = action.payload;
   return state.map((note: INote) => {
      if (note.id === noteID && note.content !== content) {
         return { ...note, content: content };
      }
      return { ...note };
   });
};

const removeNotesWithColumn = (state: INote[], action: IRemoveColumnAction) => {
   const { notesIDs } = action.payload;
   let newState = [...state];
   notesIDs.forEach((noteID: string) => {
      newState = state.filter((note: INote) => note.id !== noteID);
   })
   return newState;
}


const boardReducer = createReducer(initialState, {
   LOAD_BOARDS: loadBoards,
   REMOVE_BOARD: removeBoard,
   ADD_BOARD: addBoard,
   // LOAD_BOARD: loadBoard,
   ADD_COLUMN: addColumnWithinBoard,
   REMOVE_COLUMN: removeColumnWithinBoard,
   REORDER_COLUMNS: reorderColumns
});

const columnsReducer = createReducer(initialState, {
   LOAD_DATA: loadColumns,
   ADD_COLUMN: addNewColumn,
   REMOVE_COLUMN: removeColumn,
   EDIT_COLUMN_NAME: editColumnName,
   ADD_NOTE: addNoteWithinColumn,
   REMOVE_NOTE: deleteNoteWithinColumn,
   REORDER_NOTES: reorderNotes
});

const notesReducer = createReducer(initialState, {
   LOAD_DATA: loadNotes,
   ADD_NOTE: addNewNote,
   REMOVE_NOTE: removeNote,
   EDIT_NOTE_CONTENT: editNoteContent,
   HANDLE_LIKE: likeHandle,
   REMOVE_COLUMN: removeNotesWithColumn
});

export { boardReducer, columnsReducer, notesReducer };
