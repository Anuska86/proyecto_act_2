const express = require('express')
const bodyParser = require('body-parser')
let cors = require('cors')

//SQL
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "proyecto"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

async function getUsuarios(nombre,pass){
    con.query(`SELECT * FROM usuario WHERE nombre_usuario='${nombre}' AND pass='${pass}'`, function (err, result, fields) {
        if (err) throw err;
        //console.log(result);
        return result[0];
      });
}
//Final de SQL
const app = express()
 
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/checkUser', (req, res) => {
    //console.log(data["nombre_usuario"]);
    let nombre_usuario = req.body.nombre_usuario;
    let pass_usuario = req.body.pass;

    const SQLResponse = async () => {
      getUsuarios(nombre_usuario,pass_usuario)
};

    //SQLResponse = getUsuarios(nombre_usuario,pass_usuario)
    console.log(SQLResponse);
    res.send('Data Received: ' + JSON.stringify(req.body));
    //res.redirect('http://www.w3schools.com')
  })

app.post('/createUser', (req, res) => {
    let data = JSON.stringify(req.body);
    console.log(data);
    res.send('Data Received: ' + data);
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})