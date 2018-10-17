const express = require('express')
const app = express()
const port = 3000

let people = ["Bob", "Bill", "Jane"];

app.get('/people', function(req, res) {
  res.send(JSON.stringify(people))
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`))