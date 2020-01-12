import React from 'react'; 
import initialData from './initialData';
import Column from './Column'; 
import {DragDropContext} from 'react-beautiful-dnd';
import styled from 'styled-components'; 

const Container = styled.div`
    display: flex; 
`;

class Taskboard extends React.Component{
    state = initialData;

    //Changes text when drag starts
    onDragStart = () =>{
        // document.body.style.color = 'orange';
        // document.body.style.transition = 'background-color 0.2 ease';
        document.body.style.backgroundColor = 'rgb(199,180,142)';
    }

    // Changing background opacity
    onDragUpdate = update =>{
        // const {destination} = update;
        // const opacity = 
        //     destination ? destination.index / Object.keys(this.state.tasks).length : 0;
        // document.body.style.backgroundColor = 'rgb(199,180,142)';
    }
    
    onDragEnd = result =>{

        //Resets text and background color to initial color when drag ends
        document.body.style.color = 'inherit'; 
        document.body.style.backgroundColor = 'inherit';
        
        const {destination,source, draggableId} = result; 
        if(!destination) return; 
        if(destination.droppableId === source.droppableId && 
            destination.index === source.index) return; 
        
        const start = this.state.columns[source.droppableId]
        const finish = this.state.columns[destination.droppableId]

        //If moving to same list
        if(start === finish){
            const newTaskIds = Array.from(start.taskIds);
            newTaskIds.splice(source.index,1); 
            newTaskIds.splice(destination.index,0,draggableId);
            
            const newColumn = {
                ...start,
                taskIds : newTaskIds
            };
        
            const newState = {
                ...this.state,
                columns : {
                    ...this.state.columns,
                    [newColumn.id]: newColumn, 
                },
            };
            this.setState(newState);
            return; 
        }

        //Moving from one list to another
        const startTaskIds = Array.from(start.taskIds);
        startTaskIds.splice(source.index,1);
        const newStart = {
            ...start,
            taskIds: startTaskIds, 
        };
        
        const finishTaskIds = Array.from(finish.taskIds);
        finishTaskIds.splice(destination.index,0,draggableId);
        const newFinish = {
            ...finish,
            taskIds: finishTaskIds,
        };

        const newState ={
            ...this.state,
            columns:{
                ...this.state.columns,
                [newStart.id]: newStart,
                [newFinish.id]: newFinish,
            },
        };
        
        this.setState(newState);
    }

    render(){
        return (
            <DragDropContext 
            onDragEnd={this.onDragEnd}
            onDragStart={this.onDragStart}
            onDragUpdate={this.onDragUpdate}
            >
                <Container>
                    {this.state.columnOrder.map(columnId=>{
                        const column = this.state.columns[columnId];
                        const task = column.taskIds.map((taskId) => this.state.tasks[taskId]);
                        return <Column key = {column.id} column = {column} tasks= {task}></Column>
                    })}
                </Container>
            </DragDropContext>
        )}
}

export default Taskboard;