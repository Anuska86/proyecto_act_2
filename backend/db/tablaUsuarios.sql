create schema proyecto;
use proyecto;
create table usuario(
	id int auto_increment primary key,
    nombre_usuario varchar(255),
    pass varchar(255),
    email varchar(255),
    salario float(9,2),
    tipo varchar(255)
);
insert into usuario (nombre_usuario, pass, email, salario, tipo) values ('MarcMarsella','1234', 'mmarsella@miempresa.com', 20000.34, 'Administrador');
insert into usuario (nombre_usuario, pass, email, salario, tipo) values ('LuisMaldonado','1111', 'lmaldonado@miempresa.com', 18065.37, 'Usuario');
insert into usuario (nombre_usuario, pass, email, salario, tipo) values ('EstibalizLaza','1222', 'elara@miempresa.com', 20200.39, 'Usuario');
insert into usuario (nombre_usuario, pass, email, salario, tipo) values ('JonMayura','2222', 'jmayura@miempresa.com', 35000.12, 'Usuario');
insert into usuario (nombre_usuario, pass, email, salario, tipo) values ('JaneKole','3333', 'jkole@miempresa.com', 38001.99, 'Administrador');

select * from usuario;