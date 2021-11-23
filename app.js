const express = require('express');
var bodyParser = require('body-parser');
var { engine } = require('express-handlebars');
var session = require("express-session");
require('dotenv').config({ "path": "./pwd.env" });

app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.engine('handlebars', engine({ defaultLayout: 'main' }))
app.use(session({ secret: "cats", saveUninitialized: true, resave: false, cookie: { maxAge: 1200000 } }));
app.set('view engine', 'handlebars')
app.set("views", "./views");
var expressHbs = require('express-handlebars');
app.use(express.static("public"));
port = process.env.PORT;
var hbs = expressHbs.create({});
hbs.handlebars.registerHelper('trimString', function (passedString) {
    var theString = passedString.substring(0, 150);
    return theString;
});
hbs.handlebars.registerHelper('changeDateFormat', function (passedString) {
    var theString = new Date(passedString);
    return theString.toLocaleDateString("en-US");
});
require('./routes/route')(app);
if (!module.parent) {
    app.listen(port, (err, res) => {
        if (err) {
            console.log("Some error occured");
        }
        else {
            console.log("Servers running on port: " + port);
        }
    })
}
module.exports = app