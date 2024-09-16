const connection = require('../config/db');
const dotenv = require('dotenv').config();

async function storeCadastro(request, response) {
  
  const params = Array(
    request.body.name,
    request.body.email,
    request.body.password,
  );
  const params2 = Array(
    request.body.email,
  );

  const query = 'INSERT INTO cadastro(nome, email, senha) VALUES(?, ?, ?)';

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
}

module.exports = {
  storeCadastro
}