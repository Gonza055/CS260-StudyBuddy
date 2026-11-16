const { test } = require('node:test');
const assert = require('node:assert/strict');
const { once } = require('node:events');
const WebSocket = require('ws');
const { createServer } = require('../server');

test('serves demo pages, excludes configuration, and accepts WebSocket connections', async () => {
  const { server, wss } = createServer();
  server.listen(0, '127.0.0.1');
  await once(server, 'listening');
  const base = `http://127.0.0.1:${server.address().port}`;
  let ws;
  try {
    assert.equal((await fetch(base)).status, 200);
    assert.equal(await (await fetch(base + '/api/greet')).text(), 'Hello, World!');
    for (const file of ['dbConfig.json', 'server.js', 'package.json', '.git/config']) {
      assert.equal((await fetch(base + '/' + file)).status, 404);
    }
    ws = new WebSocket(base.replace('http:', 'ws:') + '/ws');
    const [message] = await once(ws, 'message');
    assert.match(message.toString(), /StudyBuddy demo/);
    ws.close();
    await once(ws, 'close');
  } finally {
    if (ws) ws.terminate();
    wss.close();
    server.closeAllConnections();
    await new Promise(resolve => server.close(resolve));
  }
});
