const express = require ('express');
const mysql = require ('mysql');

//Create connection
const db = mysql.createConnection({

    host : 'localhost',
    user : 'root',
    database : 'task2'
});

// Connect
db.connect((err) => {
   if (err){
       throw  err;
   }
    console.log(' MySQL Connected.... ');
});

const app = express();

// Create DB
app.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE task2';
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Database Created.....');
    });
});

// Create Table
app.get('/createTable', (req, res) => {
    let sql = 'CREATE TABLE student(id INT AUTO_INCREMENT, name VARCHAR (50), address VARCHAR (255), PRIMARY KEY (id))';
    db.query(sql, (err, result) =>{
       if (err) throw err;
        console.log(result);
        res.send('Post table Created....')
    });
});

// Insert Data
app.get('/adddata', (req, res) => {

    let post = { name: 'Manju', address: 'India'};
    let sql = 'INSERT INTO student SET ?';
    let query = db.query(sql, post, (err, result) =>{
        if (err) throw err;
        res.send('Data inserted....');
    });
});

// View Data
app.get('/viewdata', (req, res) => {

    let sql = 'SELECT * FROM student';
    let query = db.query(sql, (err, result) =>{
        if (err) throw err;
        res.json(result);
    });
});


app.listen('3000', () => {

    console.log('Server on port 3000');

});
