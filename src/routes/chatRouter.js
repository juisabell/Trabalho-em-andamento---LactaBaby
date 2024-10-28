const express = require('express');
const router = express.Router();
const ChatController = require('../controller/chatController');

// Rota para salvar mensagens

/**
 * @swagger
 * /:
 *   post:
 *     summary: Salva uma mensagem no chat
 *     description: Endpoint para salvar uma mensagem no chat.
 *     responses:
 *       201:
 *         description: Mensagem salva com sucesso.
 */
router.post('/', ChatController.saveMessage);

// Rota para recuperar mensagens entre dois usuários

/**
 * @swagger
 * /{idBLH}/{idDOADORA}:
 *   get:
 *     summary: Recupera mensagens entre dois usuários
 *     description: Endpoint para recuperar mensagens entre um BLH e uma doadora.
 *     responses:
 *       200:
 *         description: Mensagens recuperadas com sucesso.
 */
router.get('/:idBLH/:idDOADORA', ChatController.getMessagesByUser);

module.exports = router;
