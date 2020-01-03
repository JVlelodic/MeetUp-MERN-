import React from 'react'; 
import initialData from './initialData';
import Column from './Column'; 

class Main extends React.Component{
    state = initialData;
    
    render(){
        return (
            this.state.columnOrder.map(columnId=>{
                const column = this.state.columns[columnId];
                const task = column.taskIds.map((taskId) => this.state.tasks[taskId]);
                return <Column key = {column.id} column = {column} tasks= {task}></Column>
            }) 
        );
    }
}

export default Main;