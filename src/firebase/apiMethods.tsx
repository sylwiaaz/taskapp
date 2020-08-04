import { db } from './fb.config';
import { IBoard, IColumn, INote } from 'interfaces';

//BOARD
export const getBoards = (authorID: string) => {
   const boardsArray: IBoard[] = [];
   return db.collection('boards')
       .where('authorID', '==', authorID)
       .get()
       .then((data: any) => {
          data.docs.forEach((board: any) => {
             const boardData = { ...board.data(), id: board.id };
             boardsArray.push(boardData);
          });
          return boardsArray;
       })
};

export const getBoard = (id: string) => {
   return db.collection('boards').where('boardID', '==', id).get().then(data => {
      data.docs.forEach(board => {
         return { ...board.data(), id: board.id };
      });
   })
};

export const createBoard = (authorID: string, boardTitle: string) => {
   return db.collection('boards').add({
      authorID,
      boardTitle,
      columnsByID: []
   });
};

export const deleteBoard = (id: string) => {
   const collections = ['columns', 'notes'];

   collections.forEach((collection: string) => {
      const collectionPath = db.collection(collection);
      collectionPath.where('boardID', '==', id)
          .get()
          .then(data => {
             data.docs.map(doc => doc.id).forEach(id => collectionPath.doc(id).delete());
          });
   });
   return db.collection('boards')
       .doc(id)
       .delete()
}

export const getColumnsAndNotes = (collection_names: string[], boardID: string) => {
   let itemRefs = collection_names.map((name: string) => {
      return db.collection(name)
          .where('boardID', '==', boardID)
          .get()
          .then((data) => {
             let collection: any[] = [];
             data.docs.forEach(doc => {
                collection.push({ ...doc.data(), id: doc.id });
             });
             return collection;
          })
   });
   return Promise.all(itemRefs);
};

export const updateColumnsOrder = (boardID: string, sourceIndex: number, destinationIndex: number) => {
   const boardDoc = db.collection('boards').doc(boardID);
   let boardData: any;
   boardDoc.get().then((data: any) => {
      boardData = data.data();
      let newColumnList = [...boardData.columnsByID];
      const column = newColumnList.splice(sourceIndex, 1);
      newColumnList.splice(destinationIndex, 0, ...column);
      boardDoc.update('columnsByID', newColumnList);
   })
}

//COLUMNS
export const getColumns = (authorID: string, boardID: string) => {
   const columnsArray: IColumn[] = [];

   return db.collection('columns')
       .where('boardID', '==', boardID)
       .get()
       .then(data => {
          data.docs.forEach((column: any) => {
             const columnData = { ...column.data(), id: column.id };
             columnsArray.push(columnData);
          });
          return columnsArray;
       })
}

export const createColumn = (authorID: string, name: string, boardID: string) => {
   const boardDoc = db.collection('boards').doc(boardID);
   let board: any;
   return boardDoc.get()
       .then(itemData => board = itemData.data())
       .then(() => db.collection('columns').add({
          authorID,
          name,
          boardID,
          notesByID: []
       }))
       .then(column => {
          boardDoc.update('columnsByID', [...board.columnsByID, column.id])
          return column;
       })
}

export const deleteColumn = (columnID: string, boardID: string, notesIDs: string[]) => {
   const boardDoc = db.collection('boards').doc(boardID);
   let board: any;
   return boardDoc.get()
       .then(itemData => board = itemData.data())
       .then(() => boardDoc.update('columnsByID', board.columnsByID.filter((columnId: string) => columnID !== columnId)))
       .then(() => notesIDs.forEach(noteID => db.collection('notes').doc(noteID).delete()))
       .then(() => db.collection('columns').doc(columnID).delete())
}

export const editColumn = (columnName: string, columnID: string) => {
   return db.collection('columns').doc(columnID).update('name', columnName);
}

export const updateNotesOrder = (boardID: string, noteID: string, sourceID: string, destinationID: string, sourceIndex: number, destinationIndex: number) => {
   const sourceColumnDoc = db.collection('columns').doc(sourceID);
   const destinationColDoc = db.collection('columns').doc(destinationID);
   let sourceColumnData: any;
   let destinationColData: any;

   sourceColumnDoc.get()
       .then((data: any) => {
          sourceColumnData = data.data();
          let newNotesList = [...sourceColumnData.notesByID];
          newNotesList.splice(sourceIndex, 1);
          sourceColumnDoc.update('notesByID', newNotesList);
       })
       .then(() => {
          destinationColDoc.get().then((data: any) => {
             destinationColData = data.data();
             let newNotesList = [...destinationColData.notesByID];
             newNotesList.splice(destinationIndex, 0, noteID);
             destinationColDoc.update('notesByID', newNotesList);
          })
       })
}


//NOTES
export const getNotes = (authorID: string, boardID?: string) => {
   const notesArray: INote[] = [];

   return db.collection('notes')
       .where('boardID', '==', boardID)
       .get()
       .then(data => {
          data.docs.forEach((note: any) => {
             const columnData = { ...note.data(), id: note.id };
             notesArray.push(columnData);
          });
          return notesArray;
       })
}

export const createNote = (authorID: string, content: string, columnID: string, boardID: string) => {
   const columnsDoc = db.collection('columns').doc(columnID);
   let column: any;
   return columnsDoc.get()
       .then(itemData => column = itemData.data())
       .then(() => db.collection('notes').add({
          authorID,
          boardID,
          likes: [],
          content,
          columnID
       }))
       .then(note => {
          columnsDoc.update('notesByID', [...column.notesByID, note.id])
          return note;
       })
}

export const deleteNote = (noteID: string, columnID: string) => {
   const columnsDoc = db.collection('columns').doc(columnID);
   let column: any;
   return columnsDoc.get()
       .then(itemData => column = itemData.data())
       .then(() => columnsDoc.update('notesByID', column.notesByID.filter((noteId: string) => noteID !== noteId)))
       .then(() => db.collection('notes').doc(noteID).delete())
}

export const editNoteText = (noteID: string, content: string) => {
   return db.collection('notes').doc(noteID).update('content', content);
}

export const handleLikeInNote = (noteID: string, likeAuthor: string) => {
   let noteData: any;
   let updatedLikesArray: any;
   const noteDoc = db.collection('notes').doc(noteID);
   return noteDoc.get().then(data => {
      noteData = data.data();
      if (noteData.likes.find((userID: string) => likeAuthor === userID)) {
         updatedLikesArray = noteData.likes.filter((userID: string) => userID !== likeAuthor)
      } else {
         updatedLikesArray = [...noteData.likes, likeAuthor];
      }
      noteDoc.update('likes', updatedLikesArray);
   })
}
