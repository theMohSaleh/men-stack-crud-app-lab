const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const morgan = require("morgan");

const app = express();

// CONTROLLERS

catsCtrl = require('./controllers/cats')

mongoose.connect(process.env.MONGODB_URI);
// log connection status to terminal on start
mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

app.listen(3000, () => {
    console.log("Listening on port 3000");
});

app.get('/', (req, res) => {
    res.send('Hello World!');
})