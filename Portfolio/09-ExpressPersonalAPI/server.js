const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));
app.engine("ejs", require("ejs").renderFile);
app.set("view engine", "ejs")

nameList = [];
taskList = [];

app.get('/', (req, res) => {
    res.render("home");
});

app.get('/greet', (req, res) => {
    var name = req.query.name;
    if (name){
        nameList.push(name);
    }
    //console.log("Name entered: " + name);
    res.redirect("/");
});

app.get('/greet/:idx', (req, res) => {
    var index = parseInt(req.params.idx);
    var flag = true;

    if(index >= nameList.length || index < 0 || isNaN(index)){
        flag = false;
    }

    var name = nameList[index];
    res.render("wazzup", {name: name, flag: flag});
});

app.post('/task', (req,res) =>{
    var task = req.body.task;
    if (task){
        taskList.push(task);
    }
    res.redirect("/");
});

app.get('/delete/:idx', (req, res)=>{
    var dltID = req.params.idx;
    delete taskList[dltID];
    res.redirect("/");
});

app.get('/up/:idx', (req,res) => {
    var id = parseInt(req.params.idx);
    if(id != 0){
        var newId = id-1;
        var taskDown = taskList[id];
        var taskUp = taskList[newId];
        taskList[id] = taskUp;
        taskList[newId] = taskDown;
    }
    res.redirect("/");
});

app.get('/down/:idx', (req,res) => {
    var id = parseInt(req.params.idx);
    if( id < taskList.length-1){
        var newId = id+1;
        var taskUp = taskList[id];
        var taskDown = taskList[newId];
        taskList[id] = taskDown;
        taskList[newId] = taskUp;
    }
    res.redirect("/");
});


app.get('/task', (req,res) => {
    res.json(taskList);
    //res.redirect("/");
});

app.put('/greet/:name', (req,res) => {
    var name = req.params.name;
    nameList.push(name);
    res.json(nameList);
    //res.redirect("/");
});

app.listen(3000, () => {
    console.log("Application running in port 3000");
});