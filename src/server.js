const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Rota para a página inicial
app.get('/', (req, res) => {
    res.send('Servidor WebSocket rodando!');
});

// Array para armazenar os clientes conectados
const clients = [];

// Função para enviar uma mensagem para todos os clientes
function broadcast(message) {
    clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(message);
        }
    });
}

// Evento de conexão
wss.on('connection', ws => {
    // Adicionando o cliente à lista de clientes conectados
    clients.push(ws);

    // Evento de recebimento de mensagem do cliente
    ws.on('message', message => {
        // Enviando a mensagem recebida para todos os clientes
        broadcast(message);
    });

    // Evento de fechamento da conexão
    ws.on('close', () => {
        // Removendo o cliente da lista de clientes conectados
        clients.splice(clients.indexOf(ws), 1);
    });
});

// Iniciando o servidor
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    console.log(`Servidor HTTP rodando na porta ${PORT}`);
});