const express = require('express');
const router = express.Router();

router.post('/', (req,res)=>{
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

router.get('/:id',(req,res)=>{
    const task = data.tasks[`task-${req.params.id}`];
    if(!task) res.status(404).send('Task was not found');
    res.send(task);    
});

module.exports = router; 
