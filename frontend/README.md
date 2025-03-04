# Fast Fill Game Frontend

React app frontend for the Fast Fill Game application, built with Vite.

## Development

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

The development server will start on http://localhost:5173

## Building for Production

To create a production build:

```bash
npm run build
```

The built files will be in the `dist/` directory.

## Environment Variables

Create a `.env` file in the root directory with these variables:

- `VITE_API_URL` - Backend API URL (default: http://localhost:3000)

## Docker

The frontend can be built and run using Docker:

```bash
docker build -t fast-fill-game-frontend .
docker run -p 5173:5173 fast-fill-game-frontend
```