export const addColumn = name => {
  return {
    type: "ADD_COLUMN",
    payload: name
  };
};

export const editColumnName = (columnId, columnName) => {
  return {
    type: "EDIT_COLUMN_NAME",
    payload: { columnId, columnName }
  };
};

export const removeColumn = columnId => {
    return {
      type: "REMOVE_COLUMN",
      payload: { columnId }
    };
  };
