const http = require('http'); // Khai báo http
const app = require('./Backend/app'); // thiết lập logic
const debug = require('debug')('node-angular');

// getPort => try catch
const nomarlizePort = val => {
   var port = parseInt(val,10);
   if(isNaN(port))
   {
     return val;
   }
   if(port >= 0)
   {
     return port;
   }
   return false;
  };

const onError = error => {
  if(error.syscall !== 'listen')
  {
    throw error;
  }
  const bind = typeof addr === "string" ? "pipe" + aadr : "port" + port;    

  switch (error.code) {
    case "EACCES":
        console.error(bind + " requires elevated privilesges");
        process.exit(1);
        break;
    case "EADDRINUSE":
        console.error(bind + " is already in use");
        process.exit(1);
        break;
    default:
        throw erros
  }
};

const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe" + addr : "port" + port;
  debug("Listening on " + bind);
};

const port = nomarlizePort(process.env.PORT || "3000");

app.set("port", port);

const server = http.createServer(app);
server.on("error", onError);
server.on("listening", onListening);
server.listen(port);
