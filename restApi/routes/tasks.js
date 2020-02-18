const express = require("express");
const router = express.Router();
// const data = require("./initialData");

const MongoClient = require("mongodb").MongoClient;
const URL = "mongodb://localhost:27017";
const MONGONAME = "Meetup";
const TASK = "tasks";
const COLUMN = "columns"; 

router.get("/", (req, res) => {
  MongoClient.connect(URL, async (error, client) => {
    const tasksCol = client.db(MONGONAME).collection(TASK);
    const columnCol = client.db(MONGONAME).collection(COLUMN); 
    
    const tasks = await tasksCol.find().toArray();
    const columns = await columnCol.find().toArray();  
    const columnOrder = [];
    
    columns.forEach(column => columnOrder.push(column.id));
    
    state = {
      tasks,
      columns, 
      columnOrder
    }
    
    res.send(state); 
    client.close(); 
  });
});

router.post("/", (req, res) => {
  const source = req.body.source;
  const dest = req.body.dest;
  const task = req.body.taskId;

  console.log(source);
  console.log(dest);
  console.log(task);

  if (source.dropId === dest.dropId) {
    const currColumn = data.columns[source.dropId];
    const currTasks = Array.from(currColumn.taskIds);
    currTasks.splice(source.index, 1);
    currTasks.splice(dest.index, 0, task);

    const newColumn = {
      ...currColumn,
      taskIds: currTasks
    };

    res.send({
      ...data,
      columns: {
        ...data.columns,
        [source.dropId]: newColumn
      }
    });
  } else {
    const srcTaskIds = Array.from(data.columns[source.dropId].taskIds);
    srcTaskIds.splice(source.index, 1);
    const newStart = {
      ...data.columns[source.dropId],
      taskIds: srcTaskIds
    };

    const destTaskIds = Array.from(data.columns[dest.dropId].taskIds);
    destTaskIds.splice(dest.index, 0, task);
    const newDest = {
      ...data.columns[dest.dropId],
      taskIds: destTaskIds
    };

    console.log(newDest);
    console.log(newStart);

    res.send({
      ...data,
      columns: {
        ...data.columns,
        [source.dropId]: newStart,
        [dest.dropId]: newDest
      }
    });
  }
});

router.get("/:id", (req, res) => {
  const task = data.tasks[`${req.params.id}`] || "Task was not found";
  res.send(task);
});

module.exports = router;
