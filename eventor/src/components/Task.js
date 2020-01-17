import React from 'react';
import styled from 'styled-components';
import {Draggable} from 'react-beautiful-dnd';
import {Dropdown, DropdownButton} from 'react-bootstrap';

const Container = styled.div`
    width: 280px;
    border: 1px solid lightgrey;
    margin: 10px;
    background-color: ${props=> (props.isDragging ? 'skyblue': 'white')};
`;

const CardContainer = styled.div`
    width: 100%; 
    height: 175px;   
`;

const Heading = styled.h4`
    height: 30px;
    padding: 10px;
    padding-top: 3px;
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
    background-color: rgb(0,80,115); 
    font-size: small;
    color: white;
    padding: 5px;
    border-radius: 25px;
    display: inline-block;
    position: absolute;
    bottom: 5%;
`;



export default class Task extends React.Component{

    state = {
        toRender : true, 
        editForm : false,
    }
    
    delete = () =>{
        this.setState({
            toRender: !this.state.toRender,
        })
    }

    onClick = () => {
        this.setState({
            editForm : !this.state.editForm,
        });
        console.log(this.state.editForm);
    }

    render(){
            if(this.state.toRender){
                return(
                    <Draggable draggableId = {this.props.task.id} index={this.props.index}>
                        {(provided,snapshot)=>(
                            <Container 
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                            isDragging = {snapshot.isDragging}
                            >
                                <Card
                                delete = {this.delete}
                                onClick = {this.onClick}
                                heading = {this.props.task.id} 
                                body = {this.props.task.content}
                                event = {this.props.task.event}
                                >
                                </Card>
                            </Container>
                        )}
                    </Draggable>
                )
            }else{
                return null; 
            }
    }
}

const Card = (props) =>{
    return (
        <CardContainer>
            <Heading className = "text-left">
                {props.heading}
                <DropdownButton
                drop = "right" 
                className = "float-right" 
                size = "sm"
                variant = "dark"
                title = ""
                >
                    <Dropdown.Item 
                    as="button" 
                    onClick = {()=>{console.log("hello world")}}    
                    >
                        Edit
                    </Dropdown.Item>
                    <Dropdown.Item as="button" onClick = {props.delete}>Delete</Dropdown.Item>
                </DropdownButton>
            </Heading>
            <Body>
                <div>{props.body}</div>
                <Tag>{props.event}</Tag>
            </Body>
        </CardContainer>
    );
}