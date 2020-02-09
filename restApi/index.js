const express = require("express");
const cors = require("cors");
const app = express();
const task = require("./routes/tasks");
const home = require("./routes/home");

app.use(express.json(), cors());
app.use("/", home);
app.use("/tasks", task);

const port = process.env.PORT || 5468;
app.listen(port, () => console.log(`Listening on port ${port}`));
