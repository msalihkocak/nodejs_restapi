
const express = require('express')
const app = express()
const morgan = require('morgan')
const mysql = require('mysql')
const bodyParser = require('body-parser')

app.use(express.static("./public"))
app.use(morgan('combined'))
app.use(bodyParser.urlencoded({extended:false}))

app.get("/", (req, res) => {
  console.log("Responding to root route")
  res.send("Hello from root route.")
})

app.get("/users", (req, res) => {
  const connection = getConnection()

  const queryString = "SELECT * FROM users"
  connection.query(queryString, (err, rows, fields) => {
    if (err){
      console.log("Failed to fetch users: " + err)
      res.sendStatus(500)
      return
    }

    console.log("Users fetched successfully. ")
    const users = rows.map((row) => {
      return {firstName:row.first_name, lastName:row.last_name}
    })
    res.json(users)
  })
})

app.get('/users/:id', (req, res) => {
  console.log("Fetching user with id: " + req.params.id)

  const connection = getConnection()

  const userId = req.params.id
  console.log(userId)
  const queryString = "SELECT * FROM users WHERE id = ?"
  connection.query(queryString, [userId], (err, rows, fields) => {
    if (err){
      console.log("Failed to fetch users: " + err)
      res.sendStatus(500)
      return
    }

    console.log("Users fetched successfully. ")
    const users = rows.map((row) => {
      return {firstName:row.first_name, lastName:row.last_name}
    })
    res.json(users)
  })
})

app.post("/user_create", (req, res) =>{
  console.log("Trying to create user")
  
  const firstName = req.body.create_first_name
  const lastName = req.body.create_last_name
  const connection = getConnection()

  const queryString = "INSERT INTO users (first_name, last_name) VALUES (?,?)"
  connection.query(queryString, [firstName,lastName], (err, rows, fields) => {
    if(err){
      console.log(err);
      res.sendStatus(500)
      return
    }
    res.json({isSuccess:true})
  })
})

function getConnection(){
  return mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'passwd',
    database: 'salih_mysql'
  })
}

app.listen(3003, () => {
  console.log("Server is up and listening on port 3003...");
})
