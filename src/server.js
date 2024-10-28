// escutar solicitações de entrada 
// estabelece uma conexão WebSocket para comunicação em tempo real.

const app = require('./app');
const port = app.get('port');

app.listen(port, () => console.log(`Rodando na porta ${port}`));

const { WebSocketServer } = require("ws"); // cria um servidor WebSocket
const dotenv = require("dotenv");

dotenv.config();

const wss = new WebSocketServer({ port: 3004 });

let id = 0; // identifica cada cliente de forma única

// Função para gerenciar a conexão do WebSocket
const handleConnection = (ws) => {
    console.log("Cliente conectado");

    ws.on("error", console.error);
    ws.id = id++; // Atribui um ID único para cada conexão

    ws.on("message", (data) => {
        console.log("Mensagem recebida:", data.toString());
        
        // Envia a mensagem para todos os clientes conectados
        wss.clients.forEach((client) => {
            if (client.readyState === client.OPEN) { // Verifica se o cliente está aberto
                client.send(data.toString());
            }
        });
    });

    ws.on("close", () => {
        console.log(`Cliente desconectado: ${ws.id}`);
        // Aqui você pode adicionar lógica de reconexão se desejar.
    });
};

// Escuta novas conexões
wss.on("connection", handleConnection);

// Swagger: copiar da imagem
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "API LactaBaby",
            version: "1.0.0",
            description: "API para gerenciar o aplicativo de doação de leite humano",
        },
        servers: [{ url: "http://localhost:3003" }],
    },
    apis: [`${__dirname}/routes/*.js`], // caminho para as rotas
};

const taskRouter = require('./routes/taskRouter');
const chatRouter = require('./routes/chatRouter'); // adicionei outra pq tenho 2 rotas
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
