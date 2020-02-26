import React from "react";
import { PropTypes } from "prop-types";
import "./buttons.scss";
import { connect } from "react-redux";
import { addColumn, addNote } from "../../store/actions/index";
import { FaPlus } from "react-icons/fa";
import Textarea from "./Textarea";

class AddButton extends React.Component {
  state = {
    formOpen: false,
    text: ""
  };

  handleOpenForm = () => {
    this.setState(() => ({
      formOpen: true
    }));
  };

  handleTextChange = e => {
    this.setState({
      text: e.target.value
    });
  };

  handleAddColumn = () => {
    const { dispatch } = this.props;
    const { text } = this.state;
    if (text) {
      dispatch(addColumn(text));
      this.setState({
        text: ""
      });
    }
    return;
  };

  handleAddNote = () => {
    const { dispatch, columnId } = this.props;
    const { text } = this.state;
    if (text) {
      dispatch(addNote(text, columnId));
      this.setState({
        text: ""
      });
    }
    return;
  };

  closeForm = () => {
    this.setState(() => ({
      formOpen: false
    }));
    !this.props.column ? this.handleAddNote() : this.handleAddColumn();
  };

  renderForm = () => {
    const { column } = this.props;
    const placeholder = column ? "Enter column title" : "Enter a note text";
    const btnTitle = column ? "Add column" : "Add note";
    const formStyle = column ? "column-form" : "note-form";
    return (
      <div className={formStyle}>
        <Textarea
          placeholder={placeholder}
          onBlur={this.closeForm}
          value={this.state.value}
          onChange={this.handleTextChange}
        />
        <button
          className="add-btn"
          onMouseDown={column ? this.handleAddColumn : this.handleAddNote}
        >
          {btnTitle}
        </button>
      </div>
    );
  };

  renderAddButton = () => {
    const { column, btnStyle } = this.props;
    const buttonText = column ? "New column" : "Create a note";
    return (
      <button className={btnStyle} onClick={this.handleOpenForm}>
        <FaPlus className="plus-icon" />
        {buttonText}
      </button>
    );
  };
  render() {
    return this.state.formOpen ? this.renderForm() : this.renderAddButton();
  }
}

AddButton.propTypes = {
  column: PropTypes.bool,
  btnStyle: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired
};

export default connect()(AddButton);
