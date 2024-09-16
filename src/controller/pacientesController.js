const connection = require('../config/db');
const dotenv = require('dotenv').config();

async function storePacientes(request, response) {

  // Define a consulta SQL para obter todos os pacientes
  // A consulta faz uma junção entre as tabelas `cadastro` e `dados_doadora` com base no id
  // Preciso fazer uma chave estrangeira, mas agora faço cadastros independes e conecto pelo id igual
  const query = `select * from cadastro c
                join dados_doadora d
                where c.id = d.id;`;

   // Executa a consulta no banco de dados
  connection.query(query, (err, results) => {
    
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
 // Se a consulta for bem-sucedida e houver resultados
    if(results) {
      response
    // Retorna um status 200 com os dados encontrados
        .status(200)
        .json({
          success: true,
          message: 'Pacientes encontrados',
          data: results
        });
    } else {
      response
        .status(400)
        .json({
          success: false,
          message: 'Pacientes não encontrados'
        });
    }
  });
}

module.exports = {
  storePacientes
}
