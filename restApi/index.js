const express = require("express");
const cors = require("cors");
const app = express();
const task = require("./routes/task");
const home = require("./routes/home");

app.use(express.json(), cors());
app.use("/", home);
app.use("/task", task);

const port = process.env.PORT || 5468;
app.listen(port, () => console.log(`Listening on port ${port}`));
