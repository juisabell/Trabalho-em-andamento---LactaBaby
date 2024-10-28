const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');

// Importar as rotas de task e chat
const taskRouter = require('./routes/taskRouter');
const chatRouter = require('./routes/chatRouter');  // Adicionar isso
const router = require('./routes/taskRouter');
const app = express();

app.set('port', process.env.PORT || 3003);
app.use(cors());
app.use(express.json());

// Usar as rotas de task e chat
app.use('/api/tasks', taskRouter); // Para as rotas relacionadas a tarefas
app.use('/api/chat', chatRouter);  // Adicionar isso para as rotas do chat
app.use('/api', router);

module.exports = app;








