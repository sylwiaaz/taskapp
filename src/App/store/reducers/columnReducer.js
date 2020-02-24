let nextColumnId = 2;
let nextNoteId = 4;
const initialState = [
  {
    id: "column-0",
    name: "Done",
    notes: [
      { id: "note-0", content: "some content", likes: [] },
      {
        id: "note-1",
        content: "some content lorem ipsum igfkeugbf",
        likes: []
      }
    ]
  },
  {
    id: "column-1",
    name: "ToDo",
    notes: [
      {
        id: "note-2",
        content: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
        likes: []
      },
      {
        id: "note-3",
        content:
          "Perspiciatis veniam eligendi placeat doloremque autem iusto amet eius officiis rerum neque",
        likes: []
      }
    ]
  }
];

const addNewColumn = (state, action) => {
  const newColumn = {
    name: action.payload,
    notes: [],
    id: `column-${nextColumnId}`
  };
  nextColumnId++;
  return [...state, newColumn];
};

const removeColumn = (state, action) => {
  return state.filter(column => column.id !== action.payload.columnId);
};

const addNewNote = (state, action) => {
  const newNote = {
    content: action.payload.content,
    id: `note-${nextNoteId}`,
    likes: []
  };
  nextNoteId++;
  return state.map(column => {
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

const removeNote = (state, action) => {
  const { columnId, noteId } = action.payload;
  return state.map(column => {
    if (column.id === columnId) {
      const newNotesArray = column.notes.filter(note => note.id !== noteId);
      return { ...column, notes: newNotesArray };
    } else {
      return column;
    }
  });
};

const dragHandle = (state, action) => {
  const {
    droppableIdStart,
    droppableIdEnd,
    droppableIndexStart,
    droppableIndexEnd,
    type
  } = action.payload;
  let newState = [...state];

  if (type === "list") {
    const column = newState.splice(droppableIndexStart, 1);
    newState.splice(droppableIndexEnd, 0, ...column);
    return newState;
  }

  if (droppableIdStart === droppableIdEnd) {
    // in same column
    const column = newState.find(column => column.id === droppableIdStart);
    const note = column.notes.splice(droppableIndexStart, 1);
    column.notes.splice(droppableIndexEnd, 0, ...note);
  }

  if (droppableIdStart !== droppableIdEnd) {
    const columnStart = state.find(column => column.id === droppableIdStart);
    const note = columnStart.notes.splice(droppableIndexStart, 1);
    const columnEnd = state.find(column => column.id === droppableIdEnd);
    columnEnd.notes.splice(droppableIndexEnd, 0, ...note);
  }
  return newState;
};

const likeHandle = (state, action) => {
  const { noteId, likeAuthor } = action.payload;
  return state.map(column => {
    const newNotesList = column.notes.map(note => {
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

const columnReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_COLUMN":
      return addNewColumn(state, action);
    case "REMOVE_COLUMN":
      return removeColumn(state, action);
    case "DRAG_HAPPENED":
      return dragHandle(state, action);
    case "ADD_NOTE":
      return addNewNote(state, action);
    case "REMOVE_NOTE":
      return removeNote(state, action);
    case "HANDLE_LIKE":
      return likeHandle(state, action);
    default:
      return state;
  }
};

export default columnReducer;
