const express = require('express');
const router = express.Router();
const data = require('./initialData');

router.get('/', (req,res)=>{
    res.send(data);
})

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
    const task = data.tasks[`${req.params.id}`] || 'Task was not found'; 
    res.send(task);    
});

module.exports = router; 
