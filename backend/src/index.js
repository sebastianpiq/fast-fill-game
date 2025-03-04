import { server } from "./config/server.js";
import dotenv from "dotenv";
import "./config/socketConfig.js";
import "./services/playerService.js"
import "./services/gameLoopService.js";
import "./utils/logger.js"; 

dotenv.config();

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
