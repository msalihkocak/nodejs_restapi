
const express = require('express')
const router = express.Router()
const mysql = require('mysql')

router.get('/messages', (req, res) => {
    console.log("router kullanıldı.")
    res.end()
})

router.get("/users", (req, res) => {
    const connection = getConnection()

    const queryString = "SELECT * FROM users"
    connection.query(queryString, (err, rows, fields) => {
        if (err) {
            console.log("Failed to fetch users: " + err)
            res.sendStatus(500)
            return
        }

        console.log("Users fetched successfully. ")
        const users = rows.map((row) => {
            return { firstName: row.first_name, lastName: row.last_name }
        })
        res.json(users)
    })
})

router.get('/users/:id', (req, res) => {
    console.log("Fetching user with id: " + req.params.id)

    const connection = getConnection()

    const userId = req.params.id
    console.log(userId)
    const queryString = "SELECT * FROM users WHERE id = ?"
    connection.query(queryString, [userId], (err, rows, fields) => {
        if (err) {
            console.log("Failed to fetch users: " + err)
            res.sendStatus(500)
            return
        }

        console.log("Users fetched successfully. ")
        const users = rows.map((row) => {
            return { firstName: row.first_name, lastName: row.last_name }
        })
        res.json(users)
    })
})

router.post("/user_create", (req, res) => {
    console.log("Trying to create user")

    const firstName = req.body.create_first_name
    const lastName = req.body.create_last_name
    const connection = getConnection()

    const queryString = "INSERT INTO users (first_name, last_name) VALUES (?,?)"
    connection.query(queryString, [firstName, lastName], (err, rows, fields) => {
        if (err) {
            console.log(err);
            res.sendStatus(500)
            return
        }
        res.json({ isSuccess: true })
    })
})

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'us-cdbr-iron-east-01.cleardb.net',
    user: 'b4762f5b5fbca5',
    password: 'c411b818',
    database: 'heroku_d2aeed53a9cb93d'
})

function getConnection() {
    return pool
}

module.exports = router