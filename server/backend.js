const express = require("express");
const app = express();
const cors = require("cors")();
const morgan = require("morgan")("combined");
const bodyparser = require("body-parser");
require("dotenv").config();
const url = process.env.MONGO_DB;

app.use(express.json());
app.use(cors);

const db = require('monk')(url || 'localhost/submissions');
const submissions = db.get("submissions");

function isValidInput(input) {
    return (input.name && input.name.toString().trim() !== "" &&
        input.email && input.email.toString().trim() !== "" &&
        input.age && input.age.toString().trim() !== "");
}

function submission(input) {
    const name = input.name.toString();
    const email = input.email.toString();
    const age = input.age.toString();
    const bth_class = input.bth_class.toString();
    const food = input.food.toString();
    const event = input.event.toString();
    const created = new Date();

    return {
        event,
        name,
        email,
        age,
        bth_class,
        food,
        created
    };
}

app.post("/submissions", (req, res, next) => {
    if (isValidInput(req.body)) {

        const subIn = submission(req.body);

        submissions
            .insert(subIn)
            .then(inserted => res.json(inserted))
            .catch(next);

    } else {
        res.status(422);
        res.json({
            message: "You need to input correct data in all the fields."
        });
    }
});

app.get("/submissions", (req, res, next) => {
    submissions
        .find()
        .then((subs) => {
            res.json(subs)
        })
        .catch(next);
});

app.get("/", (req, res) => {
    res.json({
        message: "Welcome ☺️ Please check out our /submissions."
    });
});

app.use((error, req, res, next) => {
    res.status(500);
    res.json({
        message: error.message
    })
});

app.listen(5000, () => {
    console.log("Connected to " + url);
});