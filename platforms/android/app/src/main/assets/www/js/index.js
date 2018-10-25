var socket;
var names = [];
const password = "hfm";

localStorage.ip = "192.168.1.105";
localStorage.setItem("names", "");

function clearInputs() {
  document.getElementById("sign").value = "";
  document.getElementById("signLastname").value = "";
}
let connection = false;
document.addEventListener('deviceready', function() {
  console.log("Device Ready");
  openConnection(localStorage.ip);

});

function openConnection(ip) {
  socket = new Socket();
  localStorage.ip = ip;

  socket.open(
    ip,
    5000,
    function() {
      alert("connection Successful!!");
      socket.write("*request* id0")

    },
    function(errorMessage) {
      alert("connection Failed: " + errorMessage);
      changeIp();
    });
  socket.onData = function(data) {
    // invoked after new batch of data is received (typed array of bytes Uint8Array)

    alert(decodeUTF8(data));
    read(decodeUTF8(data));
  };
  socket.onError = function(errorMessage) {
    alert(errorMessage);
  };
  socket.onClose = function(hasError) {
    // invoked after connection close
  };
}

function changeIp() {
  document.
  getElementById("ipChange").style = "display:block";

}


function decodeUTF8(bytes) {
  var i = 0,
    s = '';
  while (i < bytes.length) {
    var c = bytes[i++];
    if (c > 127) {
      if (c > 191 && c < 224) {
        if (i >= bytes.length)
          throw new Error('UTF-8 decode: incomplete 2-byte sequence');
        c = (c & 31) << 6 | bytes[i++] & 63;
      } else if (c > 223 && c < 240) {
        if (i + 1 >= bytes.length)
          throw new Error('UTF-8 decode: incomplete 3-byte sequence');
        c = (c & 15) << 12 | (bytes[i++] & 63) << 6 | bytes[i++] & 63;
      } else if (c > 239 && c < 248) {
        if (i + 2 >= bytes.length)
          throw new Error('UTF-8 decode: incomplete 4-byte sequence');
        c = (c & 7) << 18 | (bytes[i++] & 63) << 12 | (bytes[i++] & 63) << 6 | bytes[i++] & 63;
      } else throw new Error('UTF-8 decode: unknown multibyte start 0x' + c.toString(16) + ' at index ' + (i - 1));
    }
    if (c <= 0xffff) s += String.fromCharCode(c);
    else if (c <= 0x10ffff) {
      c -= 0x10000;
      s += String.fromCharCode(c >> 10 | 0xd800)
      s += String.fromCharCode(c & 0x3FF | 0xdc00)
    } else throw new Error('UTF-8 decode: code point 0x' + c.toString(16) + ' exceeds UTF-16 reach');
  }
  return s;
}

function go() {
  //send to other app
  localStorage.setItem("names", JSON.stringify(names));
  socket.shutdownWrite();
  window.location = "admin.html";
  //localStorage.name.push(document.getElementById('sign').value);

}

function read(data) {
  data = data.replace(/"/g, "");
  data = data.replace("[", "");

  data = data.replace("]", "");

  data = data.trim();
  let arry = data.split(",");
  for (let i = 0; i < arry.length; i++) {
    names.push(arry[i]);
  }
  return names;
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
  //alert(String(document.getElementById('sign').value));
  alert("Thank You, You are now logged in.");
  clearInputs();
}