const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"))

let items = []
let workItems = []
let schoolItems = []

app.get("/", function(req, res){
    let today = new Date();
    let options = {
        weekday: "long",
        day: "numeric",
        month: "long"
        
    }

    let day = today.toLocaleDateString("en-US", options)

    res.render("list", {
        listTitle: day,
        newListItems: items
    })
});

app.post("/", function(req, res) {
    let item = req.body.newItem
    
    if (req.body.list === "Work") {
        workItems.push(item)
        res.redirect("/work")
    } else if(req.body.list === "School") {
        schoolItems.push(item)
        res.redirect("/school")
    } else {
        items.push(item)
        res.redirect("/")
    } 
})



app.get("/work", function(req, res){
    res.render("list", {
        listTitle: "Work List", 
        newListItems: workItems
    })
})

app.post("/work", function(req, res){
    let item = req.body.newItem
    res.redirect("/work")
})


app.get("/school", function(req, res){
    res.render("list", {
        listTitle: "School",
        newListItems: schoolItems
    })
})

app.post("/school", function(req, res){
    let item = req.body.newItem
    res.render("/school")
})

app.listen(3000, function(){
    console.log("Server started on port 3000");
});