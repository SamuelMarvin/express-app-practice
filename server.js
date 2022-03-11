require("dotenv").config();
const express = require('express');
const {Pool} = require('pg');
const app = express();
app.use(express.json());

const pool = new Pool ({
    connectionString: "postgres://localhost/people",
    ssl: {
        rejectUnauthorized: false
    }
});

app.use(express.static('public'));

app.get('/family', (req, res) =>{
    pool.query('SELECT * FROM family')
    .then((result)=> res.send(result.rows))
    .catch((err)=> console.log(err))
})

app.get('/family/:id', (req, res) => {
    const id = req.params.id;
    pool.query(`SELECT * FROM family WHERE id=$1;`,[id])
    .then((result)=> res.send(result.rows))
    .catch((err)=> res.sendStatus(500))
})

app.post('/family', (req, res) => {
    const {name, age} = req.body;
    pool.query('INSERT INTO family(age, name) VALUES($1, $2) RETURNING *;',[age, name])
    .then((result)=> res.send(result.rows[0]))
    .catch((err)=> res.sendStatus(500))
})

app.patch('/family/:id', (req, res) => {
    const {age, name} = req.body;
    const id = req.params.id;
    const query = `
    UPDATE family SET
        age = COALESCE($1, age),
        name = COALESCE($2, name)
    WHERE id = $3
    RETURNING *`;
    pool.query(query, [age, name, id])
    .then((result) => res.send(result.rows))
    .catch( (err) => res.sendStatus(500))
});

app.delete('/family/:id', (req,res)=>{
    const id = req.params.id;
    pool.query('DELETE FROM family WHERE id=$1;',[id])
    .then((result)=> res.send('deleted'))
    .catch((err)=> res.status(500))
});

port = process.env.PORT;
app.listen(port);