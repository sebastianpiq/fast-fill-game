const logger = {
  INFO: (message, ...args) => {
    console.log(`[INFO] ${message}`, ...args);
  },
  ERROR: (message, ...args) => {
    console.error(`[ERROR] ${message}`, ...args);
  },
  DEBUG: (message, ...args) => {
    if (process.env.NODE_ENV !== 'production') {
      console.debug(`[DEBUG] ${message}`, ...args);
    }
  }
};

export default logger; 