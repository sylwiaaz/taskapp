const addNote = (content, columnId) => {
  return {
    type: "ADD_NOTE",
    payload: { content, columnId }
  };
};

export default addNote;
