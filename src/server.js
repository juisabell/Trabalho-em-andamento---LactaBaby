// escutar solicitações de entrada 
// estabelece uma conexão WebSocket para comunicação em tempo real.

const app = require('./app');
const port = app.get('port');

app.listen(port, () => console.log(`Rodando na porta ${port}`));

const { WebSocketServer } = require("ws") //cria um servir no ws
const dotenv = require("dotenv")

dotenv.config()

const wss = new WebSocketServer({ port: 3004 })

let id = 0; // identifica cada cliente de forma unica
wss.on("connection", (ws) => {
    console.log("aqui")
    ws.on("error", console.error)
    ws.id = id++; //Atribui um ID único para cada conexão e incrementa o ID para o próximo cliente.
    ws.on("message", (data) => {
        console.log("chegou mensagem?")
        console.log(data.toString())
        wss.clients.forEach(function(client) { //preciso mudar o for each aqui pois esta pegando todos os clientes conectados
            client.send(data.toString())
        }) // Define o que acontece quando o servidor recebe uma mensagem de um cliente:
    })
})
 