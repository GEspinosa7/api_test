create database jogo;

create table if not exists personagens(
  id serial not null primary key,
  nome varchar(50) not null,
  raca varchar(60) not null
);