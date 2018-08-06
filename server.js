const mongoose = require('mongoose');
mongoose.connect('mongodb://jteng:routermaker22@ds113402.mlab.com:13402/webdev-summer2-2018', { useNewUrlParser: true })

var express = require('express')
var app = express()

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin",
    "http://localhost:4200");
  res.header("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

var session = require('express-session')
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'any string'
}));

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

const setSession = (req, res) => {
    var name = req.params['name'];
    var value = req.params['value'];
    req.session[name] = value;
    res.send(req.session);
}
const getSession = (req, res) => {
    var name = req.params['name'];
    var value = req.session[name];
    res.send(value);
}
const getSessionAll = (req, res) => {
    res.send(req.session);
}
const resetSession = (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
}

app.get('/api/session/set/:name/:value', setSession);
app.get('/api/session/get/:name', getSession);
app.get('/api/session/get', getSessionAll);
app.get('/api/session/reset', resetSession);

require('./services/user.service.server')(app)
require('./services/section.service.server')(app)

app.listen(4000)