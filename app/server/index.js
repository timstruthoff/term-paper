const express = require('express');
const app = express();
const exphbs = require('express-handlebars');

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
    res.render(__dirname + '/index.handlebars', {
        test_var:"test123",
        hello_world:"hello_world"
    });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});