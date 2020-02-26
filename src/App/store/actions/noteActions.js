export const addNote = (content, columnId) => {
  return {
    type: "ADD_NOTE",
    payload: { content, columnId }
  };
};

export const editNoteContent = (columnId, noteId, content) => {
  return {
    type: "EDIT_NOTE_CONTENT",
    payload: { columnId, noteId, content }
  };
};

export const handleLike = (noteId, likeAuthor) => {
  return {
    type: "HANDLE_LIKE",
    payload: { noteId, likeAuthor }
  };
};

export const removeNote = (noteId, columnId) => {
  return {
    type: "REMOVE_NOTE",
    payload: { noteId, columnId }
  };
};
