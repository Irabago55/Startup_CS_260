const { WebSocketServer } = require('ws');
const uuid = require('uuid');

function websocketChat(server) {
  const wss = new WebSocketServer({ server });
  const clients = new Map();

  wss.on('connection', (ws) => {
    const clientId = uuid.v4();
    clients.set(clientId, { ws, name: null });

    ws.on('message', (message) => {
      const data = JSON.parse(message);

      if (data.type === 'setName') {
        // Assign name to the client
        clients.get(clientId).name = data.name;
      } else if (data.type === 'message') {
        // Broadcast chat messages
        const senderName = clients.get(clientId).name || 'Anonymous';
        const chatMessage = JSON.stringify({
          type: 'message',
          name: senderName,
          message: data.message,
        });

        // Send to all connected clients
        clients.forEach(({ ws }) => {
          if (ws.readyState === ws.OPEN) {
            ws.send(chatMessage);
          }
        });
      }
    });

    ws.on('close', () => {
      clients.delete(clientId);
    });
  });
}

module.exports = { websocketChat };

