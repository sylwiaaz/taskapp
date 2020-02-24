const removeColumn = columnId => {
  return {
    type: "REMOVE_COLUMN",
    payload: { columnId }
  };
};

export default removeColumn;
