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

  const query = 'UPDATE dados_doadora SET idade = ?, cpf = ?, local_natal = ?, cep = ? WHERE email = ?';

  connection.query(query, params, (err, results) => {
    if(results) {
      response
        .status(201)
        .json({
          success: true,
          message: 'Formulário 1 enviado!',
          data: results
        })
    } else {
      response
        .status(400)
        .json({
          success: false,
          message: 'Formulário 1: Dados inválidos',
          data: err
      })
    }
  })
}

async function storeForms2(request, response) {
  
  const params2 = Array(
    request.body.listString,
    request.body.userEmail
  );

  const query2 = 'UPDATE dados_doadora SET doencas = ? WHERE email = ?';

  connection.query(query2, params2, (err2, results2) => {
    if(results2) {
      response
        .status(201)
        .json({
          success: true,
          message: 'Formulário 2 enviado!',
          data: results2
        })
    } else {
      console.log(query2, params2, results2)
      response
        .status(400)
        .json({
          success: false,
          message: 'Formulário 2: Dados inválidos',
          data: err2
      })
    }
  })
}

async function storeForms3(request, response) {
  
  const params3 = Array(
    request.body.listString2,
    request.body.medicacao,
    request.body.userEmail
  );

  const query3 = 'UPDATE dados_doadora SET substancias = ?, medicacao = ? WHERE email = ?';

  connection.query(query3, params3, (err3, results3) => {
    if(results3) {
      response
        .status(201)
        .json({
          success: true,
          message: 'Formulário 3 enviado!',
          data: results3
        })
    } else {
      response
        .status(400)
        .json({
          success: false,
          message: 'Formulário 3: Dados inválidos',
          data: err3
      })
    }
  })
}

module.exports = {
  storeForms,
  storeForms2,
  storeForms3
}