import React from "react";
import Column from "./Column";
import { DragDropContext } from "react-beautiful-dnd";
import styled from "styled-components";
import { connect } from "react-redux";
import { moveTask, getTask } from "../redux/actions";

const Container = styled.div`
  display: flex;
`;

class Taskboard extends React.Component {
  // state = initialData;
  constructor(props) {
    super(props);
    this.onDragEnd = this.onDragEnd.bind(this);
  }
  
  componentDidMount () {
    this.props.loadState();
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
    const { source, destination, draggableId } = result;

    if (!destination) return;

    this.props.dragTask(source, destination, draggableId);
    return;
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
    loadState: () => dispatch(getTask()),
    dragTask: (source, destination, draggableId) =>
      dispatch(moveTask(source, destination, draggableId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Taskboard);
