// server.js

const express = require("express");
const https = require("https");
const app = express();

const footer = "\n(https://icanhazdadjoke.com)"

var options = {
    host: 'icanhazdadjoke.com',
    path: '/',
    headers: {'Accept': 'application/json'}
};


// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  var joke="(see self)";
   
    https.get(options, function (res) {
      var body = '';

      res.on('data', function(chunk){
          body += chunk;
      });

      res.on('end', function(){    
          var jokeresponse = JSON.parse(body);
          joke = jokeresponse.joke;
          joke += (footer);
          response.send(joke);
      });
  }).on('error', function(e){
        console.log("Got an error: ", e);
    
   });

});

app.get("/nocredit", (request, response) => {
  var joke="(see self)";
   
    https.get(options, function (res) {
      var body = '';

      res.on('data', function(chunk){
          body += chunk;
      });

      res.on('end', function(){    
          var jokeresponse = JSON.parse(body);
          joke = jokeresponse.joke;
          response.send(joke);
      });
  }).on('error', function(e){
        console.log("Got an error: ", e);
    
   });

});


// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
