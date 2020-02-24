import React from "react";
import PropTypes from "prop-types";
import Note from "../Note/Note";
import AddButton from "../../Buttons/addButton";
import { removeColumn } from "../../../store/actions/index";
import { connect } from "react-redux";
import { Droppable, Draggable } from "react-beautiful-dnd";
import "./column.scss";
import { FaTrashAlt } from "react-icons/fa";

const Column = ({ name, id, notes, dispatch, index }) => {
  const handleRemoveColumn = () => {
    dispatch(removeColumn(id));
  };

  return (
    <Draggable draggableId={id} index={index}>
      {provided => (
        <div
          className="column-board"
          {...provided.draggableProps}
          ref={provided.innerRef}
          {...provided.dragHandleProps}
        >
          <h4 className="column-name">{name}</h4>
          <button className="remove-btn col" onClick={handleRemoveColumn}>
            <FaTrashAlt className="trash-icon" />
          </button>
          <Droppable droppableId={id}>
            {provided => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="notes-container"
              >
                {notes.map((note, index) => (
                  <Note key={note.id} {...note} index={index} columnId={id} />
                ))}
                {provided.placeholder}
                <AddButton columnId={id} btnStyle="create-note" />
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};

Column.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  notes: PropTypes.array.isRequired,
  index: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired
};

export default connect()(Column);
