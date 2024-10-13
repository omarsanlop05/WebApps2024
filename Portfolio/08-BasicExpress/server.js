const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.route('/')

    .get((req,res) => {
        res.sendFile(__dirname + "/index.html");
    })

    .post((req,res) => {
        var w = req.body.weight;
        var h = req.body.height;
        var bmi = (w / (h * h));
        res.send("Your BMI is " + bmi);
});

app.listen(3000, () => {
    console.log("Aplication is listening in port 3000");
});