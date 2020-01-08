const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

const data = {
    tasks : {
        'task-1' : { id: 'task-1', content: 'fix bathroom'},
        'task-2' : { id: 'task-2', content: 'watch show'},
        'task-3' : { id: 'task-3', content: 'eat dinner'},
        // 'task-4' : { id: 'task-4', content: 'punch wall'}
    },
    columns : {
        'column-1' :{
            id: 'column-1',
            title: 'To-do',
            taskIds : ['task-1','task-2','task-3','task-4']
        },
        'column-2' :{
            id: 'column-2',
            title: 'In progress', 
            taskIds: [],
        },
        'column-3' :{
            id: 'column-3',
            title: 'Done',
            taskIds: [],
        }
    },
    columnOrder : ['column-1','column-2','column-3'], 
}

app.get('/', (req,res) =>{
    const home = {
        header : "Home Page",
        body: "This is the homepage of the website"
    }
    res.send(home);
});

app.get('/taskboard',(req,res)=>{
    res.send(data);    
});

app.get('/task/:id',(req,res)=>{
    const task = data.tasks[`task-${req.params.id}`];
    if(!task) res.status(404).send('Task was not found');
    res.send(task);    
});

app.post('/task', (req,res)=>{

    console.log(req.body);
    console.log(req.body.id);

    const task ={
        id: req.body.id,
        content: req.body.content,
    };
    
    const newTasks = {
        ...data.tasks,
        [task.id]: task, 
    }
    
    res.send(newTasks);
});


const port = process.env.PORT || 5468; 
app.listen(port, ()=>console.log(`Listening on port ${port}`));