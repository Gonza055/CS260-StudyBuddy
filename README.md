# StudyBuddy

A BYU CS 260 educational prototype exploring a study-collaboration interface with HTML/CSS/JavaScript, a small Express server, browser-local mock data and a WebSocket connection.

## Run

Node.js 20 or newer:

```sh
npm ci
npm test
npm start
```

Open http://localhost:3000. No database credentials are needed for the demo.

## Implemented versus planned

| Implemented | Still a concept / placeholder |
| --- | --- |
| Static navigation and study pages | Real matchmaking and scheduling |
| Simulated users in local storage | Shared persistent database |
| WebSocket welcome message | Multi-user chat and presence |
| Login/register interface | Secure account registration and authentication |

Use sample values only. The forms do not authenticate users. The `studybuddy/` directory preserves an earlier React scaffold and is separate from the root demo.

## Engineering notes

`server.js` uses one HTTP listener shared with `/ws`. Static responses are allowlisted so source/configuration files are not exposed. Tests start an ephemeral local server and verify pages, excluded files and the WebSocket handshake.

Credential values were removed from the current source during maintenance. Any previously committed database credential must be rotated by the account owner; editing this version does not remove Git history. Do not reuse historical configuration.

[Portfolio](https://gonza055.github.io/)
