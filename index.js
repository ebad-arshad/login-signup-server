const express = require("express");
const mongoose = require("mongoose");
const cookies = require("cookie-parser");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cookies());
app.use(cors({
    origin: ['http://localhost:5173', "*"],
    credentials: true
}));
mongoose.set('strictQuery', true);

mongoose
    .connect("mongodb+srv://ebadarshad:ebadarshad@my-cluster.vwihqnn.mongodb.net/test_project?retryWrites=true&w=majority")
    .then(() => console.log("Connected!"))
    .catch((err) => console.log("err ===>", err));

app.use("/", require("./router"));

app.use("/", (req, res) => {
    res.send(new Date());
});

let PORT = 5001;

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});