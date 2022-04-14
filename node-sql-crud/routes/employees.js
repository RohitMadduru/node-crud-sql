const express = require('express');
const router = express.Router();
const mysql = require('mysql');

// Crating MY SQL Connection
const mySqlconnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Sachin@123',
    database: 'EmployeeDB'
});

// Checking MY SQL Connection
mySqlconnection.connect((err) => {
    if (!err) {
        console.log(" --- SQL DB Connected Sucessfully :) ---");
    }
    else {
        console.log("SQL DB Not Connected :( " + JSON.stringify(err, undefined, 2));
    }
});

// Get all Employees
router.get("/", (req, res) => {
    mySqlconnection.query('SELECT * FROM employee', (err, rows, feilds) => {
        if (err) res.send("Could not Get the Employees :( " + err);
        res.send(rows);
    })
});

// Get Employee using id
router.get("/:id", (req, res) => {
    mySqlconnection.query('SELECT * FROM employee WHERE EmpID = ?', [req.params.id], (err, rows, feilds) => {
        if (err) res.send("Could not Get the Employee with ID " + req.params.id + err);
        res.send(rows);
    })
});

// Delete an Employee using id
router.delete("/:id", (req, res) => {
    mySqlconnection.query('DELETE FROM employee WHERE EmpID = ?', [req.params.id], (err, rows, feilds) => {
        if (err) res.send("Could not Delete the Employee with ID : " + req.params.id + err);
        res.send("Deleted Employe with ID :" + req.params.id + " sucessfully :)");
    })
});

//Posting an Employee 
router.post("/", (req, res) => {
    const Id = req.body.EmpId;
    const Name = req.body.EmpName;
    const Group = req.body.EmpGroup;
    const sql = `INSERT INTO employee(EmpId ,EmpName ,EmpGroup) values('${Id}','${Name}','${Group}')`;
    mySqlconnection.query(sql, (err, rows) => {
        if (err) res.send("Could not Insert the Employee :( " + err);
        res.send(rows);
    })
});

// Updatee an Employee using id
router.put("/:id", (req, res) => {
    const id = req.params.id;
    const Name = req.body.EmpName;
    const Group = req.body.EmpGroup;
    const sql = `UPDATE employee SET EmpName ='${Name}',EmpGroup ='${Group}' WHERE EmpId ='${id}'`;
    mySqlconnection.query(sql, (err, rows) => {
        if (err) res.send("Could not Update the Employee" + req.params.id + " Details :( " + err);
        res.send("Updated Employee " + req.params.id + " Details Sucessfully :) ");
    })
});

module.exports = router;