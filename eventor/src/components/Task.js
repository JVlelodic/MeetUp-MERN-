import React from 'react';
import styled from 'styled-components';
import {Draggable} from 'react-beautiful-dnd';

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
    border-radius:25px;
    display: inline-block;
    position: absolute;
    bottom: 0;
`;

const Card = (props) =>{
    return (
        <CardContainer>
            <Heading className = "text-left">
                {props.heading}
            </Heading>
            <Body>
                <div>{props.body}</div>
                <Tag>{props.event}</Tag>
            </Body>
        </CardContainer>
    );
}

export default class Task extends React.Component{
    render(){
        return (
            <Draggable draggableId = {this.props.task.id} index={this.props.index}>
                {(provided,snapshot)=>(
                    <Container 
                     {...provided.draggableProps}
                     {...provided.dragHandleProps}
                     ref={provided.innerRef}
                     isDragging = {snapshot.isDragging}
                    >
                        <Card 
                        heading = {this.props.task.id} 
                        body = {this.props.task.content}
                        event = {this.props.task.event}
                        >
                        </Card>
                    </Container>
                )}
            </Draggable>
        );
    }
}