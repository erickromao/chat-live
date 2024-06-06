const express = require('express')
const http = require('http')
const setupWebSocket = require('./websocket')

const app = express()
const server = http.createServer(app)

setupWebSocket(server)

const PORT = 8080

server.listen(PORT, ()=> console.log(`ServerON [${PORT}]`))