
// Importa a conexão com o banco de dados
const connection = require('../config/db');
const dotenv = require('dotenv').config();

let account = null;

async function storeLoginBLH(request, response) {
  //Quando um usuário envia um formulário ou faz uma requisição POST, os dados enviados são acessíveis através de request.body. (substitiu o ?)
  const params = Array(
    request.body.unit,
  );
  
  const query = "SELECT unidade, senha, id FROM banco_de_leite WHERE unidade = ?;";
//faz a consulta no banco

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
/// Se unidade encontrada
    if (results.length > 0) {
      account = results[0]; // pega conta
      let resultPassword = account.senha; //senha banco
      let formPassword = request.body.password; //senha enviada pelo cliente

      if (resultPassword === formPassword) { // são iguais?
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
          message: 'Unidade inválida'
        });
    }
  });
}

// Exporta a função storeLoginBLH para ser usada em outros arquivos (rotas)

module.exports = {
  storeLoginBLH
}