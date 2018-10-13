const express = require("express");
const app = express();
const cors = require("cors")();
const morgan = require("morgan")("combined");
const firebase = require("firebase");
const bodyparser = require("body-parser");

app.use(bodyparser.json());
app.use(express.json());
app.use(cors);
app.use(morgan);

var config = {
    apiKey: "AIzaSyCRWpzKykmSwXjcRkArZENpyPNnIU8801M",
    authDomain: "fbproject-4c9c4.firebaseapp.com",
    databaseURL: "https://fbproject-4c9c4.firebaseio.com",
    projectId: "fbproject-4c9c4",
    storageBucket: "fbproject-4c9c4.appspot.com",
    messagingSenderId: "779133795319"
};
firebase.initializeApp(config);

const database = firebase.database();
const ref = database.ref();

function isValidInput(input)
{
    return (input.name && input.name.toString().trim() !== "" &&
        input.email && input.email.toString().trim() !== "" &&
        input.age && input.age.toString().trim() !== "");
}

function submission(input)
{
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

app.post("/submissions", (req, res) =>
{
    if ( isValidInput(req.body) )
    {
        const fd = submission(req.body);
        ref.push(fd).then(response => console.log(response));
    } else
    {
        res.status(422);
        res.json({
            message: "You need to input correct data in all the fields."
        });
    }
});

app.get("/submissions", (req, res) =>
{
    res.json({
        message: "Here all the submissions will be; check back later."
    });
});

app.get("/", (req, res) =>
{
    res.json({
        message: "Welcome ☺️ Please check out our /submissions."
    });
});

app.listen(5000, () =>
{
    console.log("Connected to port 5000");
});