const express = require("express");
const router = express.Router();

const MongoClient = require("mongodb").MongoClient;
const URL = "mongodb://localhost:27017";
const DB = "Meetup";
const TASK = "tasks";
const COLUMN = "columns";

router.get("/", (req, res) => {
  MongoClient.connect(URL, async (error, client) => {
    const tasksCol = client.db(DB).collection(TASK);
    const columnCol = client.db(DB).collection(COLUMN);

    const state = await getCurrState(tasksCol, columnCol);

    res.send(state);
    client.close();
  });
});

router.post("/", (req, res) => {
  const source = req.body.source;
  const dest = req.body.dest;
  const task = req.body.taskId;

  MongoClient.connect(URL, async (error, client) => {
    const tasksCol = client.db(DB).collection(TASK);
    const columnCol = client.db(DB).collection(COLUMN);

    if (source.dropId === dest.dropId) {
      const currTasks = await getTaskIds(columnCol, source.dropId);

      currTasks.splice(source.index, 1);
      currTasks.splice(dest.index, 0, task);

      await updateTaskids(columnCol, source.dropId, currTasks);
    } else {
      const srcTaskIds = await getTaskIds(columnCol, source.dropId);
      srcTaskIds.splice(source.index, 1);
      await updateTaskids(columnCol, source.dropId, srcTaskIds);

      const destTaskIds = await getTaskIds(columnCol, dest.dropId);
      destTaskIds.splice(dest.index, 0, task);
      await updateTaskids(columnCol, dest.dropId, destTaskIds);
    }

    const state = await getCurrState(tasksCol, columnCol);
    res.send(state);
    client.close();
  });
});

router.get("/:id", (req, res) => {
  MongoClient.connect(URL, async (error, client) => {
    const taskCol = client.db(DB).collection(TASK);
    const response = await taskCol.findOne({ id: req.params.id });
    
    const task = response || {
      id: "Error",
      content: "This task does not exist",
      event: null
    };

    res.send(task);
    client.close();
  });
});

router.delete("/", (req, res) => {
  MongoClient.connect(URL, async (error, client) => {
    
    const columnCol = client.db(DB).collection(COLUMN);
    const taskCol = client.db(DB).collection(TASK);
    
    await taskCol.deleteOne({ id: req.body.id });

    const columnTasks = await columnCol.findOne({id: req.body.column}).taskIds;
    columnTasks = columnTasks.filter(task => task.id !== req.body.id);
    
    await updateTaskids(columnCol, req.body.column, tasks)
    
    const state = await getCurrState(taskCol, columnCol)
    res.send(state);
    client.close();
  });
})

async function getCurrState(tasksCol, columnCol) {
  const tasks = await tasksCol.find().toArray();
  const columns = await columnCol.find().toArray();
  const columnOrder = [];
  columns.forEach(column => columnOrder.push(column.id));

  state = {
    tasks,
    columns,
    columnOrder
  };

  return state;
}

async function getTaskIds(columnCol, columnId) {
  try {
    const column = await columnCol.findOne({ id: columnId });
    return column.taskIds;
  } catch (error) {
    console.log("Failed. Error: ", error);
  }
}

async function updateTaskids(columnCol, columnId, tasks) {
  try {
    await columnCol.updateOne(
      { id: columnId },
      {
        $set: {
          taskIds: tasks
        }
      }
    );
    return;
  } catch (error) {
    console.log("Failed. Error: ", error);
  }
}

module.exports = router;
