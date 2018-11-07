// load our app server using express somehow..
const express = require('express')
const app = express()
const morgan = require('morgan')
const mysql = require('mysql')

app.use(morgan('combined'))

app.get('/users/:id', (req, res) => {
  console.log("Fetching user with id: " + req.params.id)

  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'passwd',
    database: 'salih_mysql'
  })

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

  // res.end()
})

app.get("/", (req, res) => {
  console.log("Responding to root route")
  res.send("Hello from root rootue.")
})

app.get("/users", (req, res) => {
  var user1 = {firstName: "Mehmet Salih", lastName: "Koçak"}
  const user2 = {firstName: "Safiye", lastName: "Koçak"}
  res.json([user1, user2])
})



app.listen(3003, () => {
  console.log("Server is up and listening on port 3003...");
})
