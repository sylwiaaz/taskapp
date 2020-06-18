import { createReducer } from '@reduxjs/toolkit';
import {
   SortType
} from 'store/actions/boardActions';

export type ColumnType = {
   id: string,
   name: string,
   notes: NoteType[]
}

export type NoteType = {
   id: string,
   content: string,
   likes: string[]
}

// const initialState: ColumnType[] = [
//    {
//       id: 'column-0',
//       name: 'Done',
//       notes: [
//          {
//             id: 'note-0',
//             content: 'quo temporibus omnis distinctio, laboriosam totam.',
//             likes: []
//          },
//          {
//             id: 'note-1',
//             content:
//                'Labore recusandae nulla nesciunt esse, consequuntur fuga reiciendis consectetur.',
//             likes: []
//          }
//       ]
//    },
//    {
//       id: 'column-1',
//       name: 'ToDo',
//       notes: [
//          {
//             id: 'note-2',
//             content: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.',
//             likes: []
//          },
//          {
//             id: 'note-3',
//             content:
//                'Perspiciatis veniam eligendi placeat doloremque autem iusto amet eius officiis rerum neque',
//             likes: []
//          },
//          {
//             id: 'note-4',
//             content: 'Labore quis incidunt tempore hic ut. Fugit.',
//             likes: []
//          }
//       ]
//    }
// ];

const initialState: any = [];

let nextNoteId = 0;
let nextColumnId = 0;

const loadBoards = (state: any, action: any) => {
   const {boards} = action.payload;
   return boards;
};


const addBoard = (state: any, action: any) => {
   const { board } = action.payload;
   return [...state, board]
};

const removeBoard = (state: any, action: any) => {
   const {board} = action.payload;
   return state.filter((boardItem:any) => boardItem.id !== action.payload.board.id)
}

const loadBoard = (state: any, action: any) => {
   const {board} = action.payload;
   console.log(board);
   return board;
};

const addNewColumn = (state: ColumnType[], action: any) => {
   const newColumn = {
      name: action.payload,
      notes: [],
      id: `column-${nextColumnId}`
   };
   nextColumnId++;
   return [...state, newColumn];
};

const removeColumn = (state: ColumnType[], action: any) => {
   return state.filter((column: ColumnType) => column.id !== action.payload.columnId);
};

const addNewNote = (state: ColumnType[], action: any) => {
   const newNote = {
      content: action.payload.content,
      id: `note-${nextNoteId}`,
      likes: []
   };
   nextNoteId++;
   return state.map((column: ColumnType) => {
      if (column.id === action.payload.columnId) {
         return {
            ...column,
            notes: [...column.notes, newNote]
         };
      } else {
         return column;
      }
   });
};

const removeNote = (state: ColumnType[], action: any) => {
   const { columnId, noteId } = action.payload;
   return state.map((column: ColumnType) => {
      if (column.id === columnId) {
         const newNotesArray = column.notes.filter(note => note.id !== noteId);
         return { ...column, notes: newNotesArray };
      } else {
         return column;
      }
   });
};

const dragHandle = (state: ColumnType[], action: SortType) => {
   const {
      droppableIdStart,
      droppableIdEnd,
      droppableIndexStart,
      droppableIndexEnd,
      type
   } = action.payload;
   let newState = [...state];

   if (type === 'list') {
      // drag and drop columns
      const column = newState.splice(droppableIndexStart, 1);
      newState.splice(droppableIndexEnd, 0, ...column);
      return newState;
   }

   if (droppableIdStart === droppableIdEnd) {
      // drag and drop note in same column
      const column = newState.find(column => column.id === droppableIdStart);
      if (!column) return;
      const note = column.notes.splice(droppableIndexStart, 1);
      column.notes.splice(droppableIndexEnd, 0, ...note);

   }

   if (droppableIdStart !== droppableIdEnd) {
      // drag and drop note between different columns
      const columnStart = newState.find(column => column.id === droppableIdStart);
      if (!columnStart) return;
      const note = columnStart.notes.splice(droppableIndexStart, 1);
      const columnEnd = newState.find(column => column.id === droppableIdEnd);
      if (!columnEnd) return;
      columnEnd.notes.splice(droppableIndexEnd, 0, ...note);
   }
};

const editColumnName = (state: ColumnType[], action: any) => {
   const { columnId, columnName } = action.payload;
   return state.map((column: ColumnType) => {
      if (column.id === columnId && column.name !== columnName) {
         return { ...column, name: columnName };
      }
      return { ...column };
   });
};

const likeHandle = (state: ColumnType[], action: any) => {
   const { noteId, likeAuthor } = action.payload;
   return state.map((column: ColumnType) => {
      const newNotesList = column.notes.map((note: NoteType) => {
         if (note.id === noteId) {
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
      return { ...column, notes: newNotesList };
   });
};

const editNoteContent = (state: ColumnType[], action: any) => {
   const { columnId, noteId, content } = action.payload;
   return state.map((column: ColumnType) => {
      if (column.id === columnId) {
         return {
            ...column,
            notes: column.notes.map((note: NoteType) => {
               if (note.id === noteId && note.content !== content) {
                  return { ...note, content };
               }
               return note;
            })
         };
      }
      return column;
   });
};

// const boardsReducer = createReducer(initialState, {
//
// });


const boardReducer = createReducer(initialState, {
   LOAD_BOARDS: loadBoards,
   REMOVE_BOARD: removeBoard,
   ADD_BOARD: addBoard,
   LOAD_BOARD: loadBoard,
   ADD_COLUMN: addNewColumn,
   REMOVE_COLUMN: removeColumn,
   EDIT_COLUMN_NAME: editColumnName,
   DRAG_HAPPENED: dragHandle,
   ADD_NOTE: addNewNote,
   REMOVE_NOTE: removeNote,
   EDIT_NOTE_CONTENT: editNoteContent,
   HANDLE_LIKE: likeHandle
});

export {boardReducer};
