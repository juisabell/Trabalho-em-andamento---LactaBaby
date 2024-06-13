const connection = require('../config/db');
const dotenv = require('dotenv').config();

async function storeForms(request, response) {
  
  const params = Array(
    request.body.age,
    request.body.cpf,
    request.body.natal,
    request.body.cep,
    request.body.userEmail
  );
  const params2 = Array(
    request.body.doencasList
  );

  const query = 'UPDATE dados_doadora SET idade = ?, cpf = ?, local_natal = ?, cep = ? WHERE email = ?';

  connection.query(query, params, (err, results) => {
    if(results) {
      response
        .status(201)
        .json({
          success: true,
          message: 'Conta criada com sucesso!',
          data: results
        })
    } else {
      console.log(query, params, results)
      response
        .status(400)
        .json({
          success: false,
          message: 'Dados inválidos',
          data: err
      })
    }
  })

  const query2 = 'INSERT INTO dados_doadora(doencas) VALUES(?)';

  connection.query(query2, params2, (err, results2) => {
  })
}

module.exports = {
  storeForms
}