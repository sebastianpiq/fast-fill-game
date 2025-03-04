# Fast Fill Game Backend

Node.js + SockerIo backend server for the Fast Fill Game application.

## Development

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

The server will start on http://localhost:3000

## Docker

The backend can be built and run using Docker:

```bash
docker build -t fast-fill-game-backend .
docker run -p 3000:3000 fast-fill-game-backend
``` 