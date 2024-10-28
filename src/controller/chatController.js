const connection = require('../config/db');
const dotenv = require('dotenv').config();

const ChatController = {
    saveMessage: (req, res) => {
       
        console.log("testeeeee", req.body)

        if(req.body.tipoUser == "normal") {
             params = [
                req.body.idDestino,
                req.body.userId,
                2, //1 - enviado pelo BLH, 2 - enviado pela pessoa,
                req.body.content
            ]
        } else {
             params = [
                req.body.userId,
                req.body.idDestino,
                1, //1 - enviado pelo BLH, 2 - enviado pela pessoa,
                req.body.content
            ]
        }
    
        const query = 'INSERT INTO chat (idBLH, idDOADORA, enviado, msg) VALUES (?, ?, ?, ?)';
        
        connection.query(query, params, (err, result) => {
            if (err) {
                console.error('Erro ao salvar a mensagem: ', err);
                res.status(500).json({ error: 'Erro ao salvar a mensagem.' });
            } else {
                res.status(200).json({ message: 'Mensagem salva com sucesso!' });
            }
        });
    },

    getMessagesByUser: (req, res) => {
        const { idBLH, idDOADORA } = req.params;
        
        const query = `SELECT * FROM chat WHERE (idBLH = ? AND idDOADORA = ?) OR (idBLH = ? AND idDOADORA = ?)`;
        
        connection.query(query, [idBLH, idDOADORA, idDOADORA, idBLH], (err, results) => {
            if (err) {
                console.error('Erro ao buscar mensagens: ', err);
                res.status(500).json({ error: 'Erro ao buscar mensagens.' });
            } else {
                res.status(200).json(results);
            }
        });
    }
};

module.exports = ChatController;
