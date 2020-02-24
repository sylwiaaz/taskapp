import React from "react";
import PropTypes from "prop-types";
import { removeNote, handleLike } from "../../../store/actions/index";
import { connect } from "react-redux";
import { Draggable } from "react-beautiful-dnd";
import { AiFillLike } from "react-icons/ai";
import { MdClose } from "react-icons/md";
import "./note.scss";

class Note extends React.Component {
  state = {
    isLikedNote: false
  };

  handleRemoveNote = () => {
    const { id, dispatch, columnId } = this.props;
    dispatch(removeNote(id, columnId));
  };

  handleAddLike = () => {
    const { id, dispatch } = this.props;
    dispatch(handleLike(id, "user1"));
    this.setState(prevState => ({
      isLikedNote: !prevState.isLikedNote
    }));
  };
  render() {
    const { id, content, index, likes } = this.props;
    return (
      <Draggable draggableId={id} index={index}>
        {provided => (
          <div
            className="note"
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <p className="note-content">{content}</p>
            <div className="buttons">
              <button onClick={this.handleRemoveNote} className="remove-btn">
                <MdClose className="icon" />
              </button>
              <button onClick={this.handleAddLike} className={"like-btn"}>
                {likes.length ? (
                  <span className="likes-amount">{likes.length}</span>
                ) : null}
                <AiFillLike
                  className={
                    this.state.isLikedNote ? "icon liked-icon" : "icon"
                  }
                />
              </button>
            </div>
          </div>
        )}
      </Draggable>
    );
  }
}

Note.propTypes = {
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  columnId: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired
};

export default connect()(Note);
