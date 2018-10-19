const express = require("express");
const app = express();
const cors = require("cors")();
const morgan = require("morgan")("combined");
const monk = require("monk");
const bodyparser = require("body-parser");
require("dotenv").config();

app.use(bodyparser.json());
app.use(cors);
app.use(morgan);

const db = monk(process.env.MONGO_DB || 'http://localhost:5000/submissions');
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

    return {
        event,
        name,
        email,
        age,
        bth_class,
        food
    };
}

app.post("/submissions", (req, res, next) => {
    if (isValidInput(req.body)) {
        const subIn = submission(req.body);
        console.log(submissions);
        console.log(isValidInput(req.body));

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
        .then(subs => {
            console.log("Hello!");
            console.log(subs);
            res.json(subs)
        })
        .catch(next);
});

app.get("/", (req, res) => {
    res.json({
        message: "Welcome ☺️ Please check out our /submissions."
    });
});

app.listen(5000, () => {
    console.log("Connected to port 5000");
});