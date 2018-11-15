
const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')

app.use(express.static("./public"))
app.use(morgan('combined'))
app.use(bodyParser.urlencoded({extended:false}))

const router = require('./routes/user.js')
app.use(router)

app.get("/", (req, res) => {
  console.log("Responding to root route")
  res.send("Hello from root route.")
})

const PORT = process.env.PORT || 3002

app.listen(PORT, () => {
  console.log("Server is up and listening on: " + PORT);
})
