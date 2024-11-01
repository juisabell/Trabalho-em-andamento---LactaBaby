const connection = require('../config/db');
const dotenv = require('dotenv').config();

let account = null;

async function storeLogin(request, response) {
  
  const params = Array(
    request.body.email,
    request.body.senha
  );
  
  const query = `
  SELECT cadastro.id, cadastro.nome, cadastro.email, cadastro.senha, dados_doadora.idade, 
  dados_doadora.doencas, dados_doadora.substancias, dados_doadora.medicacao FROM 
  cadastro JOIN dados_doadora ON cadastro.email = dados_doadora.email WHERE cadastro.email = ?;
  `;

  connection.query(query, params, (err, results) => {
    if (err) {
      response
        .status(500)
        .json({
          success: false,
          message: 'Erro no servidor',
          data: err
        });
      return;
    }

    if (results.length > 0) {
      account = results[0];
      let resultPassword = account.senha;
      let formPassword = request.body.password;

      if (resultPassword === formPassword) {
        response
          .status(200)
          .json({
            success: true,
            message: 'Login feito com sucesso',
            data: account
          });
      } else {
        response
          .status(400)
          .json({
            success: false,
            message: 'Senha inválida'
          });
      }      
    } else {
      response
        .status(400)
        .json({
          success: false,
          message: 'Email inválido'
        });
    }
  });
}

module.exports = {
  storeLogin
}