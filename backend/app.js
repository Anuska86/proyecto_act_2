const express = require('express')
const bodyParser = require('body-parser')
let cors = require('cors')

const app = express()
 
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/checkUser', (req, res) => {
    let data = JSON.stringify(req.body);
    console.log(data);
    res.send('Data Received: ' + data);
    res.redirect('http://www.w3schools.com')
  })

app.post('/createUser', (req, res) => {
    let data = JSON.stringify(req.body);
    console.log(data);
    res.send('Data Received: ' + data);
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})