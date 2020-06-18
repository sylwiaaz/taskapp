interface Board {
   authorID: string,
   id: string,
   boardTitle: string,
   columnsByID: string[]
}

interface Column {
   id: string,
   authorID: string,
   boardID: string,
   name: string,
   notesByID: string[]
}

interface Note {
   id: string,
   authorID: string,
   boardID: string,
   content: string,
   columnID: string,
   likes: string[]
}

export { Board, Column, Note };