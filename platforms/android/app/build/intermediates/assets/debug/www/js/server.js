net = require('net');

// Keep track of the chat clients
var clients = [];
var people = [];

// Start a TCP Server
net.createServer(function(socket) {

  // Identify this client
  socket.name = socket.remoteAddress + ":" + socket.remotePort


  clients.push(socket);


  broadcast(socket.name + " joined the server\n", socket);

  // Handle incoming messages from clients.
  socket.on('data', function(data) {
    people.push(data);
    broadcast(socket.name + "> " + data, socket);
  });

  // Remove the client from the list when it leaves
  socket.on('end', function() {
    clients.splice(clients.indexOf(socket), 1);
    broadcast(socket.name + " left the chat.\n");
  });

  // Send a message to all clients
  function broadcast(message, sender) {
    clients.forEach(function(client) {
      // Don't want to send it to sender
      if (client === sender) return;
      people.forEach(function(person) {
        client.write(message);
        broadcast(message);
      });



    });
    // Log it to the server output too
    process.stdout.write(message + "\n")
  }

}).listen(5000);

// Put a friendly message on the terminal of the server.
console.log("Faith Hope server running at port 5000\n");