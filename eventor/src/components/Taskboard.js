import React from "react";
import Column from "./Column";
import { DragDropContext } from "react-beautiful-dnd";
import styled from "styled-components";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { moveTask } from "../redux/actions";

const Container = styled.div`
  display: flex;
`;

class Taskboard extends React.Component {
  // state = initialData;
  constructor(props) {
    super(props);
  }

  //Changes text when drag starts
  onDragStart = () => {
    // document.body.style.color = 'orange';
    // document.body.style.transition = 'background-color 0.2 ease';
    // document.body.style.backgroundColor = 'rgb(199,180,142)';
  };

  // Changing background opacity
  onDragUpdate = update => {
    // const {destination} = update;
    // const opacity =
    //     destination ? destination.index / Object.keys(this.state.tasks).length : 0;
    // document.body.style.backgroundColor = 'rgb(199,180,142)';
  };

  onDragEnd = result => {
    document.body.style.color = "inherit";
    document.body.style.backgroundColor = "inherit";
    const { destination, source, draggableId } = result;
    console.log();
    moveTask(
      draggableId,
      source.index,
      source.droppableId,
      destination.index,
      destination.droppableId
    );
  };

  render() {
    return (
      <DragDropContext
        onDragEnd={this.onDragEnd}
        onDragStart={this.onDragStart}
        onDragUpdate={this.onDragUpdate}
      >
        <Container>
          {this.props.columnOrder.map(columnId => {
            const column = this.props.columns[columnId];
            const task = column.taskIds.map(taskId => this.props.tasks[taskId]);
            return (
              <Column key={column.id} column={column} tasks={task}></Column>
            );
          })}
        </Container>
      </DragDropContext>
    );
  }
}

const mapStateToProps = state => {
  return {
    tasks: state.tasks,
    columnOrder: state.columnOrder,
    columns: state.columns
  };
};

const mapDispatchToProps = dispatch => {
  return {
    moveTask: (dragId, srcIndex, srcDropId, destIndex, destDropId) =>
      dispatch(moveTask(dragId, srcIndex, srcDropId, destIndex, destDropId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Taskboard);
