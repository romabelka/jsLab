var WebSocketServer = require('ws').Server;

module.exports = function(server) {
    var webSocketServer = new WebSocketServer({server: server});
    webSocketServer.on('connection', function(ws) {
        ws.onmessage = function(msg) {
            console.log('---', 123, msg.data);
            webSocketServer.clients.forEach(function(client) {
                client.send(msg.data);
            })
        }
    })
};