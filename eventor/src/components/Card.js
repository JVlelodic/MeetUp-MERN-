import React from "react";
import styled from "styled-components";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { deleteTask } from "../redux/actions";
import { connect } from "react-redux";

const CardContainer = styled.div`
  width: 100%;
  height: 175px;
`;

const Heading = styled.h5`
  height: 30px;
  padding: 10px;
  padding-top: 5px;
`;

const Body = styled.div`
  height: 132px;
  margin: 5px;
  text-align: left;
  padding-left: 10px;
  padding-top: 5px;
  background-color: lightgray;
  position: relative;
`;

const Tag = styled.div`
  background-color: rgb(0, 80, 115);
  font-size: small;
  color: white;
  padding: 5px;
  border-radius: 25px;
  display: inline-block;
  position: absolute;
  bottom: 5%;
`;

const URL = "localhost:3000/home"

const Card = props => {
  return (
    <CardContainer>
      <Heading 

      className="text-left">
        <a href="">{props.heading}</a>
        <DropdownButton
          drop="right"
          className="float-right"
          size="sm"
          variant="dark"
          title=""
        >
          <Dropdown.Item
            isSelected
            as="button"
            onClick={() => {
              console.log("hello world");
            }}
          >
            Edit
          </Dropdown.Item>
          <Dropdown.Item
            as="button"
            onClick={() => {
              props.remove(props.taskIndex, props.columnId);
            }}
          >
            Delete
          </Dropdown.Item>
        </DropdownButton>
      </Heading>
      <Body>
        <div>{props.body}</div>
        <Tag>{props.event}</Tag>
      </Body>
    </CardContainer>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    remove: (taskId, columnId) => dispatch(deleteTask(taskId, columnId))
  };
};

export default connect(null, mapDispatchToProps)(Card);
