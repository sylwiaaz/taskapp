const removeNote = (noteId, columnId) => {
  return {
    type: "REMOVE_NOTE",
    payload: { noteId, columnId }
  };
};

export default removeNote;
