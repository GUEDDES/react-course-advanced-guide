// Simple WebSocket server for development
// Run with: node server/websocket-server.js

const WebSocket = require('ws');

const PORT = 8080;
const wss = new WebSocket.Server({ port: PORT });

console.log(`🚀 WebSocket server running on ws://localhost:${PORT}`);

// Simulate real-time metrics updates
const platforms = ['twitter', 'instagram', 'linkedin'];

wss.on('connection', (ws) => {
  console.log('✅ Client connected');

  // Send welcome message
  ws.send(JSON.stringify({
    type: 'connected',
    message: 'Connected to WebSocket server'
  }));

  // Simulate metrics updates every 5 seconds
  const interval = setInterval(() => {
    const platform = platforms[Math.floor(Math.random() * platforms.length)];
    const data = {
      type: 'metrics_update',
      platform,
      data: {
        followers: Math.floor(Math.random() * 100) + 1000,
        engagement: (Math.random() * 5 + 1).toFixed(1),
        posts: Math.floor(Math.random() * 50) + 10
      },
      timestamp: new Date().toISOString()
    };

    ws.send(JSON.stringify(data));
  }, 5000);

  // Handle client messages
  ws.on('message', (message) => {
    console.log('Received:', message.toString());
    
    try {
      const data = JSON.parse(message);
      
      if (data.type === 'ping') {
        ws.send(JSON.stringify({ type: 'pong' }));
      }
    } catch (error) {
      console.error('Error parsing message:', error);
    }
  });

  ws.on('close', () => {
    console.log('❌ Client disconnected');
    clearInterval(interval);
  });

  ws.on('error', (error) => {
    console.error('⚠️ WebSocket error:', error);
  });
});

process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down WebSocket server...');
  wss.close(() => {
    console.log('✅ Server closed');
    process.exit(0);
  });
});
