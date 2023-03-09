var request = require("request");
var connection = require ('../config/connection');

function Usuario() {
  this.get = function(res) {
    connection.acquire(function(err,con) {
      con.query('select * from usuario', function(err,result) {
        con.release();
        res.send(result);
        console.log("Get successful");
      });
    });
  };
  this.checkUser = function(user_name,user_pass,res) {
    connection.acquire(function(err,con) {
      con.query('select * from usuario where nombre_usuario = ? and pass = ?', [user_name,user_pass], function(err,result) {
        con.release();
        res.send(result);
        console.log("Check user successful");
      });
    });
  };
  this.create = function(usuario,res) {
    connection.acquire(function(err,con) {
      con.query('insert into usuario set ?', usuario, function(err,result) {
        con.release();
        if (err) {
          res.send({status:1, message:'USUARIO creation fail'});
        } else {
          res.send({status:0, message:'USUARIO create success'});
          console.log("Post successful");
        }
      });
    });
  };
  this.update = function(usuario,id,res) {
    connection.acquire(function(err,con) {
      let query = `update usuario set nombre_usuario='${usuario.nombre_usuario}',pass='${usuario.pass}',email='${usuario.email}',salario=${usuario.salario} where id=${id}`
      con.query(query, function(err,result) {
        con.release();
        if (err) {
          res.send({status:1, message:'USUARIO update fail'});
        } else {
          res.send({status:0, message:'USUARIO update success'});
          console.log("Put successful");
        }
      });
    });
  };
  this.delete = function(id,res) {
    connection.acquire(function(err,con) {
      con.query('delete from usuario where id = ?', id, function(err,result) {
        con.release();
        if (err) {
          res.send({status:1, message:'USUARIO delete fail'});
        } else {
          res.send({status:0, message:'USUARIO delete success'});
          console.log("Delete successful");
        }
      });
    });
  };
};

module.exports = new Usuario();
