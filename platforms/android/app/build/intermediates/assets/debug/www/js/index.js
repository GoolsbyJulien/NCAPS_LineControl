function go() {
  //send to other app
  window.location = "admin.html";
  localStorage.name = document.getElementById('sign').value;
  alert(String(document.getElementById('sign').value));
}