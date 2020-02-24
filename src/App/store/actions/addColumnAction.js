const addColumn = name => {
  return {
    type: "ADD_COLUMN",
    payload: name
  };
};

export default addColumn;
