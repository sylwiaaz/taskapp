import { db } from './fb.config';
import { Column, Note } from '../interfaces/Board';


const getAllData = (collection_names: string[], authorID: string) => {
   let itemRefs = collection_names.map((name: string) => {
      return db.collection(name)
         .where('authorID', '==', authorID)
         .get()
         .then((data) => {
            let collection: any[] = [];
            data.docs.forEach(doc => {
               // collection.push({ [doc.id]: { ...doc.data(), id: doc.id } });
               collection.push({ ...doc.data(), id: doc.id });
            });
            return collection;
         })
         .catch((err) => {
            throw (err);
         });
   });

   return Promise.all(itemRefs);
};


export const getBoards = (authorID: string) => {

   return getAllData(['boards', 'columns', 'notes'], authorID).then((results: any) => {
      const [boards, columns, notes] = results;

      const columnsWithSortedNotes = columns.map((column: Column) => {
         const notesArr = column.notesByID ? column.notesByID.map((noteID: string) => {
            return notes.find((note: Note) => noteID === note.id);
         }) : [];
         return { ...column, notes: notesArr };
      });

      const newBoards = boards.map((board: any) => {
         const columnsArr = board.columnsByID ? board.columnsByID.map((columnID: string) => {
            return columnsWithSortedNotes.find((column: any) => column.id === columnID);
         }) : [];
         return { ...board, columns: columnsArr };
      });
      return newBoards;
   });
};


export const getBoard = (id: string) => {
   let columnsArray: any[] = [];
   let newArr: any[];
   const notesArray: any[] = [];
   return db.collection('columns').where('boardID', '==', id).get().then(data => {
      data.docs.forEach(column => {
         // console.log(column.data());
         columnsArray.push({ ...column.data(), id: column.id });
      });
   }).then(() => {
      db.collection('notes').where('boardID', '==', id).get().then(notes => {
         notes.docs.forEach(note => {
            notesArray.push({ ...note.data(), id: note.id });
         });
      }).then(() => {
         columnsArray = columnsArray.map(column => {
            console.log(column);
            console.log(notesArray);
            let notes = notesArray.filter(note => note.columnID === column.id);
            return { ...column, notes: [...notes] };
         });
         console.log(columnsArray);
         return columnsArray;
      });


   });
};

export const createBoard = (boardTitle: string) => {
   return db.collection('boards').add({
      boardTitle,
      columns: []
   });
};

export const setBoard = (id: string, content: any) => {
   return db.collection('boards')
      .doc(id)
      .set(content)
      .then((data) => {
         console.log(data);
      }).catch(error => error);
};