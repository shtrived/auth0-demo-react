const { createLogger, format, transports } = require('winston');

const logger = createLogger({
  format: format.simple(),
  transports: [new transports.Console()],
  exitOnError: false,
});

logger.stream = {
  write: function(message, encoding) {
    logger.info(message.trim());
  },
};

module.exports = logger;
