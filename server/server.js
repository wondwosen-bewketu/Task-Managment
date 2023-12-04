const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const TaskRoutes = require("./Routes/task");
require("dotenv").config();
const { connectToDatabase } = require("./database/db"); 

const app = express();

// Connect to MongoDB
connectToDatabase()
 

app.use(cors());
app.use(bodyParser.json());

app.use("/api", TaskRoutes);

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
