const connection = require('../config/db');
const dotenv = require('dotenv').config();

async function storeCadastro(request, response) {
  
   // Coleta dados da requisição e os coloca em arrays para enviar para o banco de dados
  // `params` é um array com o nome, e-mail e senha do usuário
  // params é um array que contém os valores que serão usados em uma consulta SQL para substituir os ? na string da consulta SQL.
  // Um Array é uma estrutura de dados que armazena uma coleção de valores. 
  const params = Array(
    request.body.name,
    request.body.email,
    request.body.password,
  );
  const params2 = Array(
    request.body.email,
  );
  const params3 = Array(
    request.body.name
  )

    // Consulta SQL para inserir dados na tabela 'dados_doadora'
  const query = 'INSERT INTO cadastro(nome, email, senha) VALUES(?, ?, ?)';

  // Executa a consulta SQL para adicionar o e-mail à tabela 'dados_doadora'
  connection.query(query, params, (err, results) => {
    if(results) {
      response
        .status(201)
        .json({
          success: true,
          message: 'Conta criada com sucesso!',
          data: params[1]
        })
    } else {
      response
        .status(400)
        .json({
          success: false,
          message: 'Dados inválidos',
          data: err
      })
    }
  })

  const query2 = 'INSERT INTO dados_doadora(email) VALUES(?)';

  connection.query(query2, params2, (err, results2) => {
  })

  const query3 = 'INSERT INTO chat(nome) VALUES(?)';

  connection.query(query3, params3, (err, results2) => {
  })
}

module.exports = {
  storeCadastro
}