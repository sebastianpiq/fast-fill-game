# Fast Fill Game

A fast-paced 2-player grid-filling game where players compete to claim the most squares. Players click empty squares to color them with their assigned color (red or blue). The game features live updates of the grid state, square counts, and elapsed time across all players' browsers. The game concludes when the grid is completely filled, with victory going to the player who claimed the most squares. In case of an equal number of squares, the game ends in a tie.

## Project Structure

- `frontend/` - React web application using Vite
- `backend/` - Node.js + Socket.io backend server
- `docker-compose.yml` - Docker configuration for running the entire stack

## Prerequisites

Required:
- Node.js 18+ 
- npm or yarn

Optional:
- Docker and Docker Compose (only if you want to run using containers)

## Getting Started

### Option 1: Running without Docker

1. Clone the repository:
```bash
git clone https://github.com/sebastianpiq/fast-fill-game.git
cd fast-fill-game
```

2. Start the backend:
```bash
cd backend
npm install
npm run dev
```

3. In a new terminal, start the frontend:
```bash
cd frontend
npm install
npm run dev
```

The services will be available at:
- Frontend: http://localhost:5173
- Backend: http://localhost:3000

### Option 2: Running with Docker

Start the application using Docker Compose:
```bash
docker-compose up
```

To run in detached mode:
```bash
docker-compose up -d
```

To stop the services:
```bash
docker-compose down
```

To rebuild the containers after making changes:
```bash
docker-compose up --build
```

The services will be available at:
- Frontend: http://localhost:5173
- Backend: http://localhost:3000
