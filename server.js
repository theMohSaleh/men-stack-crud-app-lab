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


// GET /
app.get('/', async (req, res) => {
    res.render("index.ejs");
})

// GET /cats
app.get("/cats", catsCtrl.index);

// GET /cats/new
app.get("/cats/new", catsCtrl.new);

// GET /cats/:fruitID
app.get("/cats/:fruitId", catsCtrl.get);

// POST /cats
app.post("/cats", catsCtrl.show);

// GET localhost:3000/cats/:fruitId/edit
app.get("/cats/:fruitId/edit", catsCtrl.edit);

app.put("/cats/:fruitId", catsCtrl.update);

app.delete("/cats/:fruitId", catsCtrl.delete);