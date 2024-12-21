const express = require("express");
const connectDb = require("./config/dbConnection");
const dotenv = require("dotenv").config();
const cors = require("cors");

connectDb();
const app = express();

const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use("/classes", require("./routes/classRoutes"));
app.use("/students", require("./routes/studentRoutes"));
app.use("/subjects", require("./routes/subjectRoutes"));
app.use("/teachers", require("./routes/teacherRoutes"));
app.use("/grades", require("./routes/gradeRoutes"));

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
