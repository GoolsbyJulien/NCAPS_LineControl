net = require('net');

const port = 5000;
// Keep track of the chat clients
var clients = [];
var people = [];

// Start a TCP Server
net.createServer(function(socket) {
  for (let i = 0; i < clients.length; i++) {
    if (clients[i].remotePort == socket.remotePort) {
      process.stdout.write("Same Connection Abort" + "\n")



      return;
    }
  }

  // Identify this client
  socket.name = socket.remoteAddress + ":" + socket.remotePort


  clients.push(socket);


  broadcast(socket.name + " joined the server. " + clients.length + " in the server \n ", socket);

  // Handle incoming messages from clients.
  socket.on('data', function(data) {
    people.push(data);
    broadcast(socket.name + "> " + data, socket);
  });
  process.on('uncaughtException', function(err) {
    console.error(err.stack);
    console.log("Node NOT Exiting...");
    socket.end();
  });
  // Remove the client from the list when it leaves
  socket.on('end', function() {
    clients.splice(clients.indexOf(socket), 1);
    broadcast(socket.name + " left the server. " + clients.length + " in the server\n");
  });

  // Send a message to all clients
  function broadcast(message, sender) {
    clients.forEach(function(client) {
      // Don't want to send it to sender
      if (client === sender || clients.lengh == 1) return;
      people.forEach(function(person) {
        client.write(message);
      });

    });
    // Log it to the server output too
    process.stdout.write(message + "\n")
  }

}).listen(port);

// Put a friendly message on the terminal of the server.
console.log("Faith Hope server running at port: " + port + "\n");