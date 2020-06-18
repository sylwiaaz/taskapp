import { createBoard, getBoard, getBoards } from 'firebase/apiMethods';
import { Board } from '../../interfaces/Board';


//
// export type EditColumnName = { type: string, payload: { columnId: string, columnName: string } };
// export type RemoveColumn = { type: string, payload: { columnId: string } }
// export type AddNote = { type: string, payload: { content: string, columnId: string } };
// export type EditNoteContent = { type: string, payload: { columnId: string, noteId: string, content: string } };
// export type HandleLike = { type: string, payload: { noteId: string, likeAuthor: string } };
// export type RemoveNote = { type: string, payload: { noteId: string, columnId: string } }


// BOARD ACTIONS

export const loadBoards = (id: string, authorID: string) => {
   return (dispatch: any) => {
      getBoards(authorID).then((boards: Board[]) => {
         dispatch({
            type: 'LOAD_BOARDS',
            payload: { boards }
         });
      });
   };
};


export const loadBoard = (id: string) => {
   return (dispatch: any) => {
      return getBoard(id)
         .then((board: any) => {
            console.log(board);
            dispatch({
               type: 'LOAD_BOARD',
               payload: { board }
            });
         }).catch((err: any) => {
            throw(err);
         });
   };
};


export const addBoard = (boardTitle: string) => {
   return (dispatch: any) => {
      return createBoard(boardTitle)
         .then((board: any) => {
            console.log(board);
            dispatch({
               type: 'ADD_BOARD',
               payload: { boardTitle }
            });
         }).catch((error: any) => {
            console.log(error);
         });
   };
};

export const reorderColumns = (columnId: string, sourceID: number, sourceIndex: number, destinationIndex: number) => {
   return (dispatch: any) => {
      dispatch({
         type: 'REORDER_COLUMNS',
         payload: { sourceID, sourceIndex, destinationIndex }
      });
   };
};

// export const updateBoard = (id: string, content: any, cb: any, ...rest: any) => {
//    return function (dispatch: any) {
//       return setBoard(id, content)
//          .then((data: any) => {
//             console.log(data);
//             dispatch(cb(...rest));
//          }).catch((error: any) => {
//             throw(error);
//          });
//    };
// };


// COLUMN ACTIONS

export const addColumn = (name: string, boardId: string) => {
   return (dispatch: any) => {
      const id = 'id';
      dispatch({
         type: 'ADD_COLUMN',
         payload: { name, id, boardId }
      });
   };
};

export const editColumnName = (columnId: string, columnName: string, boardId: string) => {
   return (dispatch: any) => {
      dispatch({
         type: 'EDIT_COLUMN_NAME',
         payload: { columnId, columnName }
      });
   };
};

export const removeColumn = (columnId: string, boardId: string) => {
   return (dispatch: any) => {
      dispatch({
         type: 'REMOVE_COLUMN',
         payload: { columnId, boardId }
      });
   };
};


export const reorderColumn = (noteId: string, columnId: string, sourceID: number, sourceIndex: number, destinationId: string, destinationIndex: number, boardId: string) => {
   return (dispatch: any) => {
      dispatch({
         type: 'REORDER_COLUMN',
         payload: { sourceID, sourceIndex, destinationId, destinationIndex }
      });
   };
};


// NOTE ACTIONS
export const addNote = (content: string, columnId: string, boardId: string) => {
   return (dispatch: any) => {
      const noteId = 'id';
      dispatch({
         type: 'ADD_NOTE',
         payload: { content, columnId, noteId }
      });
   };
};

export const editNoteContent = (columnId: string, noteId: string, content: string, boardId: string) => {
   return (dispatch: any) => {
      dispatch({
         type: 'EDIT_NOTE_CONTENT',
         payload: { columnId, noteId, content }
      });
   };
};

export const removeNote = (noteId: string, columnId: string, boardId: string) => {
   return (dispatch: any) => {
      dispatch({
         type: 'REMOVE_NOTE',
         payload: { noteId, columnId }
      });
   };
};

export const handleLike = (noteId: string, likeAuthor: string) => {
   return {
      type: 'HANDLE_LIKE',
      payload: { noteId, likeAuthor }
   };
};
// sort action
export type SortType = {
   type: string, payload: {
      droppableIdStart: string,
      droppableIdEnd: string,
      droppableIndexStart: number,
      droppableIndexEnd: number,
      draggableId: string,
      type: string
   }
}

export const sort = (droppableIdStart: string,
                     droppableIdEnd: string,
                     droppableIndexStart: number,
                     droppableIndexEnd: number,
                     draggableId: string,
                     type: string) => {
   return (dispatch: any) => {
      dispatch({
         type: 'DRAG_HAPPENED',
         payload: {
            droppableIdStart,
            droppableIdEnd,
            droppableIndexStart,
            droppableIndexEnd,
            draggableId,
            type
         }
      });
   };
};
