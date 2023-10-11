// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/:date?", function (req, res) {
  let unix;
  let utcDate;
  let isFalseData = false;
  if (req.params.date === undefined){ //no input, return current date
    unix = Date.now();
    utcDate = new Date(unix);
  }
  else if (!isNaN(Number(req.params.date))){ //is unix
    if (Number(req.params.date) !== parseInt(req.params.date)){
      isFalseData = true;
    }
    unix = parseInt(req.params.date);
    utcDate = new Date(unix);
  }
  else if (new Date(req.params.date) !== "Invalid Date" && !isNaN(new Date(req.params.date))){ //is date
    unix = Date.parse(req.params.date);
    utcDate = new Date(req.params.date);
  }
  else { //invalid input
    isFalseData = true;
  }
  if (isFalseData) {res.json({"error": "Invalid Date"});}
  else {res.json({"unix": unix, "utc": new Date(unix)});}
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
