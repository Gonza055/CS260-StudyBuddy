if ('WebSocket' in window) {
  const scheme = window.location.protocol === 'https:' ? 'wss' : 'ws';
  const ws = new WebSocket(`${scheme}://${window.location.host}/ws`);
  ws.onmessage = event => {
    const messages = document.getElementById('messages');
    if (messages) messages.textContent += event.data + '\n';
  };
  ws.onerror = () => console.warn('Demo connection unavailable.');
}
