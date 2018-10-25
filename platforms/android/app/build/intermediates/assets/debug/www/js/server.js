net = require('net');

const port = 5000;
// Keep track of the chat clients
var clients = [];
var people = [];
class person {


  constructor(lastname) {
    this.name = lastname;
    this.id = (420 + Math.random() * 4000) +
      lastname;
    this.rank = people.length;
    this.min = 20;
    this.sec = 0;
    this.timer = false;
  }
}
people.push(new person("Person 1"));

people.push(new person("Person 2"));
people.push(new person("Person 3"));
setInterval(function() {
  for (let i = 0; i < people.length; i++) {
    if (people[i] == true) {
      people[i].sec--;
      if (sec <= 0) {
        people[i].min--;
        people[i].sec = 59;
      }
    }
  }
}, 1000);
// Start a TCP Server
net.createServer(function(socket) {
  for (let i = 0; i < clients.length; i++) {
    if (clients[i].remotePort == socket.remotePort) {
      process.stdout.write("Same Connection Abort" + "\n")



      return;

      //ball.bounce(fast);
    }
  }

  // Identify this client
  socket.name = socket.remoteAddress + ":" + socket.remotePort


  clients.push(socket);


  broadcast(socket.name + " joined the server. " + clients.length + " in the server \n ", socket, false);
  let names = [];
  for (let i = 0; i < people.length; i++)
    names.push(people[i].name);
  socket.write(JSON.stringify(names));

  // Handle incoming messages from clients.
  socket.on('data', function(data) {
    let request = data.toString();
    console.log("request " + request);
    socket.write("A");
    if (request.indexOf("*request*") == -1) {
      people.push(new person(request));
    } else {
      if (request.indexOf("id") > -1) {
        socket.write("*id*" + people[request.split("id")[1]].id);
        process.stdout.write("IDDD " + people[request.split("id")[1]].id)
      } else if (request.indexOf("timer") > -1) {

        socket.write("*timer* " + getPersonFromID(request) + " " + people[getFromIndexID(getPersonFromID(request))].min + " " + people[getFromIndexID(getPersonFromID(request))].sec);
      } else if (request.indexOf("start") > -1) {
        people[getFromIndexID(request.split("start")[1])].timer = true;
      }
    }


  });
  process.on('uncaughtException', function(err) {
    console.error(err.stack);
    console.log("Node NOT Exiting...");
    socket.end();
  });
  // Remove the client from the list when it leaves
  socket.on('end', function() {
    clients.splice(clients.indexOf(socket), 1);
    broadcast(socket.name + " left the server. " + clients.length + " in the server\n", false);
  });

  // Send a message to all clients
  function broadcast(message, sender, send) {
    clients.forEach(function(client) {
      // Don't want to send it to sender
      if (client === sender || clients.lengh == 1) return;
      people.forEach(function(person) {
        if (send)
          client.write(message);
      });

    });
    // Log it to the server output too
    process.stdout.write(message + "\n")
  }

}).listen(port);

function getPersonFromID(id) {
  console.log("id : " + id);
  for (let i = 0; i < people.length; i++) {
    if (id.indexOf(people[i].id))
      return people[i].id;
  }
}

function getFromIndexID(id) {
  console.log("idw : " + id);

  for (let i = 0; i < people.length; i++) {
    if (id.indexOf(people[i].id)) {
      console.log("idex : " + id);

      return i;
    }
  }
}

function updateArrayOnClients() {
  socket.write(JSON.stringify(people));
  broadcast(JSON.stringify(people));
}
// Put a friendly message on the terminal of the server.
console.log("Faith Hope server running at port: " + port + "\n");