var socket;
var names = [];
localStorage.clear();
if (JSON.parse(localStorage.getItem("names")) != null) {
  names = JSON.parse(localStorage.getItem("names"))
}

function clearInputs() {
  document.getElementById("sign").value = "";
  document.getElementById("signLastname").value = "";
}
let connection = false;
document.addEventListener('deviceready', function() {
  socket = new Socket();

  if (localStorage.connected == null) {

    socket.open(
      "192.168.1.105",
      5000,
      function() {
        alert("connection Successful!!");
      },
      function(errorMessage) {
        alert("connection Failed");
      });
    socket.onData = function(data) {
      // invoked after new batch of data is received (typed array of bytes Uint8Array)
      var data = new Uint8Array
      names.push((Utf8ArrayToStr(data)));
      alert(names);

    };
    socket.onError = function(errorMessage) {
      alert(errorMessage);
    };
    socket.onClose = function(hasError) {
      // invoked after connection close
      localStorage.connected = null;
    };
  } else
    alert("connection open");

});


function Utf8ArrayToStr(array) {
  var out, i, len, c;
  var char2, char3;

  out = "";
  len = array.length;
  i = 0;
  while (i < len) {
    c = array[i++];
    switch (c >> 4) {
      case 0:
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
        // 0xxxxxxx
        out += String.fromCharCode(c);
        break;
      case 12:
      case 13:
        // 110x xxxx   10xx xxxx
        char2 = array[i++];
        out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
        break;
      case 14:
        // 1110 xxxx  10xx xxxx  10xx xxxx
        char2 = array[i++];
        char3 = array[i++];
        out += String.fromCharCode(((c & 0x0F) << 12) |
          ((char2 & 0x3F) << 6) |
          ((char3 & 0x3F) << 0));
        break;
    }
  }

  return out;
}

function go() {
  //send to other app
  localStorage.setItem("names", JSON.stringify(names));

  window.location = "admin.html";
  //localStorage.name.push(document.getElementById('sign').value);

}



function send() {
  if (!String(document.getElementById('sign').value)) {

    alert("Please enter Firstname");
    return;
  }
  if (!String(document.getElementById('signLastname').value)) {

    alert("Please enter Lastname");
    return;
  }



  names.push(document.getElementById('sign').value);
  var dataString = document.getElementById('sign').value;
  var data = new Uint8Array(dataString.length);
  for (var i = 0; i < data.length; i++) {
    data[i] = dataString.charCodeAt(i);
  }
  if (socket)
    socket.write(data);
  alert(String(document.getElementById('sign').value));
  clearInputs();
}