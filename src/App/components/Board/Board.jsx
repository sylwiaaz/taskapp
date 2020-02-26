import React from "react";
import PropTypes from "prop-types";
import "./board.scss";
import Column from "./Column/Column";
import { connect } from "react-redux";
import AddButton from "../Buttons/AddButton";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { sort } from "../../store/actions/index";

class Board extends React.Component {
  handleDragEnd = result => {
    const { destination, source, draggableId, type } = result;
    if (!destination) {
      return;
    }
    this.props.dispatch(
      sort(
        source.droppableId,
        destination.droppableId,
        source.index,
        destination.index,
        draggableId,
        type
      )
    );
  };

  render() {
    const columnList = this.props.columns.map((column, index) => (
      <Column {...column} key={column.id} index={index} />
    ));
    return (
      <DragDropContext onDragEnd={this.handleDragEnd}>
        <div className="board">
          <Droppable direction="horizontal" type="list" droppableId="all-list">
            {provided => (
              <div
                className="column-container"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {columnList}
                {provided.placeholder}
                <AddButton column btnStyle="add-column" />
                <div
                  style={{
                    marginLeft: "40px",
                    width: "30px",
                    opacity: 0
                  }}
                >
                  null
                </div>
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>
    );
  }
}

const mapStateToProps = state => {
  return {
    columns: state.columns
  };
};

Board.propTypes = {
  columns: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired
};

export default connect(mapStateToProps)(Board);
