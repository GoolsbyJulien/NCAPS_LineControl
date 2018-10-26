var people = [];
class person {

  /*constructor(name) {
    this.name = name;
    this.id = (10000 + Math.random() * 9000) +
      name;
    this.rank = people.length;
  }*/
  constructor(lastname) {
    this.name = lastname;
    this.id = (420 + Math.random() * 4000) +
      lastname;
    this.rank = people.length;
  }
}

add("Person 1");
add("Person 2");
add("Person 3");
let passedName = JSON.parse(localStorage.getItem("names"));

for (let i = 0; i < passedName.length; i++)
  add(passedName[i]);





function getSectionId(element) {
  return element.split("_")[0];
}

function countdown(element, min, sec) {
  var timer = document.getElementById(element);
  let inq = 0;
  for (let i = 0; people.length; i++) {
    if (people[i].id == getSectionId(element)) {
      inq = i;
      break;
    }
  }
  console.log(inq);
  if (people[inq].interval == null) {

    let interval = setInterval(function() {

      sec--;
      if (sec <= 0) {
        if (min == 5) {

          alert("Five min warning");
        }

        if (min == 0) {
          clearInterval(interval);
          people[inq].interval = null;
          let sound = new Audio("cuckoo-clock.mp3");

          sound.play();
          timer.innerHTML = "EXPIRED";

        } else {
          min--;

          sec = 59;
        }

      }
      let secTemp = sec;

      if (sec < 10) {
        secTemp = '0' + sec; // adds a 0 when its less than 10

      }
      if (min > 1 || sec > 0)
        timer.innerHTML = min + ":" + secTemp;



    }, 1000);

    people[inq].interval = interval;
  }
}

function update() {

  for (i = 0; i < people.length; i++) {
    let p = people[i];

    var h3 = document.getElementById(p.id + "_name"); // Create a <p> node

    h3.innerHTML = ((p.rank + 1) + " " + p.name + " ");

  }
}

function swap(v1, v2) {
  let e = document.getElementById("list");
  let e1 = document.getElementById(v1.id + "_list");

  e.insertBefore(e1, e.childNodes[v1.rank - 1]); //- 1]);
  let temp = v2;
  var array = {
    e,
    e1
  };
  //i added temptest
  let temptest = v1;
  people[v1.rank] = v2;
  //people[v2.rank] = temp;
  people[v2.rank] = temptest;

  temp = v1.rank;

  v1.rank = v2.rank;
  v2.rank = temp;
  update();
}

function start(name) {
  countdown(name + "_timer", 20, 0)
}

function removePerson(person) {
  let element = document.getElementById(person.id + "_list");


  element.parentNode.removeChild(element);


  removeA(people, person);


  for (let i = 0; i < people.length; i++) {
    let p = people[i];
    if (p.rank > person.rank) people[i].rank--;
  }
  update();
}

function removeA(arr) {
  var what, a = arguments,
    L = a.length,
    ax;
  while (L > 1 && arr.length) {
    what = a[--L];
    while ((ax = arr.indexOf(what)) !== -1) {
      arr.splice(ax, 1);
    }
  }
  return arr;
}

function add(name) {
  person.people++;
  if (name.indexOf("_") != -1)
    name = name.replace(/_/g, "");
  name.trim();
  let p = new person(name);
  people.push(p);
  let id = p.id;

  var ul = document.getElementById("list");
  var li = document.createElement('li');
  li.id = p.id + "_list";
  var para = document.createElement("p"); // Create a <p> node
  para.id = p.id + "_timer";

  var h3 = document.createElement("h3"); // Create a <p> node
  h3.id = p.id + "_name";

  var b1 = document.createElement("button");
  b1.id = p.id + "_start";
  b1.onclick = function() {
    start(p.id);
  };
  var b2 = document.createElement("button");
  b2.id = p.id + "_up";
  b2.onclick = function() {
    swap(p, people[p.rank - 1]);
  };
  var b3 = document.createElement("button");
  b3.id = p.id + "_remove";
  b3.onclick = function() {
    removePerson(p);
  };
  var remove = document.createAttribute("class"); // Create a "class" attribut

  remove.value = "remove";
  b1.appendChild(document.createTextNode("Start"));
  b2.appendChild(document.createTextNode("Move-up"));
  b3.appendChild(document.createTextNode("remove"));
  h3.appendChild(document.createTextNode((p.rank + 1) + " " + name + " "));


  // Create a text node
  para.appendChild(document.createTextNode(" 20:00")); // Append the text to <p>
  var att = document.createAttribute("class"); // Create a "class" attribute
  att.value = "person"; // Set the value of the class attribute
  var att2 = document.createAttribute("style"); // Create a "class" attribute
  att2.value = "padding-right: 3px;";

  h3.setAttributeNode(att2);
  li.appendChild(h3);
  li.appendChild(para);
  li.appendChild(b1);
  li.appendChild(b2);
  li.appendChild(b3);
  ul.appendChild(li);
  li.setAttributeNode(att);
  b3.setAttributeNode(remove);


}

function toggleScreen() {
  console.log(document.getElementById("select").value);
  if (document.getElementById("select").value == "Stats") {
    showTab2();
  } else {
    showTab1();
  }
}

function showTab1() {
  document.getElementById("tab1").className = "shown";
  document.getElementById("tab2").className = "hidden";

}

function showTab2() {
  document.getElementById("tab2").className = "shown";
  document.getElementById("tab1").className = "hidden";

}