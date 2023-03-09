var usuario = require('../models/usuario');

module.exports = {
  configure: function(app) {
    app.get('/usuario',function(req,res) {
      usuario.get(res);
    });
    app.get('/usuario/:user_name/:user_pass',function(req,res) {
      usuario.checkUser(req.params.user_name,req.params.user_pass,res);
    });
    app.post('/usuario',function(req,res) {
      usuario.create(req.body,res);
    });
    app.put('/usuario/:id',function(req,res) {
      usuario.update(req.body,req.params.id,res);
    });
    app.delete('/usuario/:id',function(req,res) {
      usuario.delete(req.params.id,res);
    });
  }
};
