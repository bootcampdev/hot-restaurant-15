const path = require("path");
const express = require("express");


const app = express();

const PORT = process.env.PORT || 3001;
//const PORT = 3001;

// middleware
app.use(express.urlencoded({extended: true}))
app.use(express.json());

const tables = []

const waitList = []

// routes

app.get("/", (req, res) => {
    //res.send('success');
    res.sendFile( path.join(__dirname + "/index.html"));
})

app.get("/reservation", (req, res) => {

    res.sendFile( path.join(__dirname + "/reservation.html"));
})

app.get("/api/tables", (req, res) => {

    res.json({tables, waitList});
})

app.post("/api/tables/add", (req, res) => {
    console.log(req.body);

    const newTable = req.body;
    let reservation = "";

    if (tables.length >=5 )
    {        
        waitList.push(newTable);
        reservation = "You are wait listed";
    }
    else {
        newTable.customerID = tables.length + 1;
        
        tables.push(newTable);
        reservation = "You have a reservation on table " + tables.length;
    }    
    
    console.log(tables);
    //res.status(200).send();
    res.send(reservation);
})


app.listen(PORT, () => {
    console.log("server is listening " + PORT);
})