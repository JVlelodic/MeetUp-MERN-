import React from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import Card from "./Card";

const Container = styled.div`
  width: 280px;
  border: 1px solid lightgrey;
  margin: 10px;
  background-color: ${props => (props.isDragging ? "skyblue" : "white")};
`;

class Task extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toRender: true,
      editForm: false
    };
  }

  delete = () => {
    this.setState({
      toRender: !this.state.toRender
    });
  };

  onClick = () => {
    this.setState({
      editForm: !this.state.editForm
    });
    console.log(this.state.editForm);
  };

  render() {
    if (this.state.toRender) {
      return (
        <Draggable draggableId={this.props.task.id} index={this.props.index}>
          {(provided, snapshot) => (
            <div>
              <Container
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef}
                isDragging={snapshot.isDragging}
              >
                <Card
                  id={this.props.task.id}
                  taskIndex={this.props.index}
                  columnId={this.props.columnId}
                  onClick={this.onClick}
                  heading={this.props.task.id}
                  body={this.props.task.content}
                  event={this.props.task.event}
                ></Card>
              </Container>
            </div>
          )}
        </Draggable>
      );
    } else {
      return null;
    }
  }
}

export default Task;
