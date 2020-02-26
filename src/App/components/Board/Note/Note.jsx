import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  removeNote,
  handleLike,
  editNoteContent
} from "../../../store/actions/index";
import { connect } from "react-redux";
import { Draggable } from "react-beautiful-dnd";
import { AiFillLike } from "react-icons/ai";
import { MdClose } from "react-icons/md";
import "./note.scss";
import Textarea from "../../Buttons/Textarea";

const Note = ({ id, dispatch, columnId, content, index, likes }) => {
  const [isLikedNote, setLikedNote] = useState(false);
  const [value, setValue] = useState(content);
  const [openInput, setOpenInput] = useState(false);

  const handleRemoveNote = () => {
    dispatch(removeNote(id, columnId));
  };

  const handleAddLike = () => {
    dispatch(handleLike(id, "user1"));
    setLikedNote(!isLikedNote);
  };

  const handleClick = () => {
    setOpenInput(true);
  };

  const handleOnChange = e => {
    setValue(e.target.value);
  };

  const handleBlur = e => {
    setOpenInput(false);
    if (value) {
      dispatch(editNoteContent(columnId, id, value));
    }
  };

  return (
    <Draggable draggableId={id} index={index}>
      {provided => (
        <div
          className="note"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {openInput ? (
            <Textarea
              onBlur={handleBlur}
              value={value}
              onChange={handleOnChange}
            />
          ) : (
            <p className="note-content" onClick={handleClick}>
              {content}
            </p>
          )}
          <div className="buttons">
            <button onClick={handleRemoveNote} className="remove-btn">
              <MdClose className="icon" />
            </button>
            <button onClick={handleAddLike} className={"like-btn"}>
              {likes.length ? (
                <span className="likes-amount">{likes.length}</span>
              ) : null}
              <AiFillLike
                className={isLikedNote ? "icon liked-icon" : "icon"}
              />
            </button>
          </div>
        </div>
      )}
    </Draggable>
  );
};

Note.propTypes = {
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  columnId: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired
};

export default connect()(Note);
