// Custom middleware that logs the type and path of each request to the server
const clog = (req, res, next) => {
  const fgCyan = '\x1b[36m';
  const ts = new Date().toLocaleString();

  switch (req.method) {
    case 'GET': {
      console.info(`📗 ${fgCyan}${ts}\t${req.method} request to ${req.path}`);
      break;
    }
    case 'POST': {
      console.info(`📘 ${fgCyan}${ts}\t${req.method} request to ${req.path}`);
      break;
    }
    default:
      console.log(`📙${fgCyan}${ts}\t${req.method} request to ${req.path}`);
  }

  next();
};

module.exports = clog;
