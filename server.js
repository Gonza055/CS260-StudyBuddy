const express = require('express');
const http = require('node:http');
const path = require('node:path');
const { WebSocketServer } = require('ws');

// Educational demo only: account forms use browser-local mock data.
// Serve a deliberate allowlist, never the repository or its configuration.
function createServer() {
  const app = express();
  const pages = ['index.html', 'login.html', 'signup.html', 'forum.html',
    'resources.html', 'matchmaking.html', 'styles.css', 'app.js', 'websocket.js'];
  app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
  for (const page of pages) {
    app.get('/' + page, (req, res) => res.sendFile(path.join(__dirname, page)));
  }
  app.use('/website-images', express.static(path.join(__dirname, 'website-images')));
  app.get('/api/greet', (req, res) => res.send('Hello, World!'));
  const server = http.createServer(app);
  const wss = new WebSocketServer({ server, path: '/ws', maxPayload: 4096 });
  wss.on('connection', ws => {
    ws.send('Connected to the StudyBuddy demo.');
    ws.on('error', () => {});
  });
  return { server, wss };
}

if (require.main === module) {
  const { server } = createServer();
  const port = process.env.PORT || 3000;
  server.listen(port, () => console.log(`StudyBuddy demo: http://localhost:${port}`));
}
module.exports = { createServer };
