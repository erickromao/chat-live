const webSocket = require('ws')

function setupWebSocket(server){

    const wss = new webSocket.Server({server})
    wss.on('connection', (ws)=>{
        console.log('Client se conectou.')

        ws.on('message', (message)=>{

            wss.clients.forEach((client)=>{
                if(client !== ws){
                    client.send(`Outro cliente: ${message}`)
                }
            })
        })

        ws.on('close', ()=>{
            console.log('Client se desconectou.')
        })
    })
}

module.exports = setupWebSocket