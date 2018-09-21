var express = require('express')
var app = express()
var path = require("path");
var Twit = require('twit')

var T = new Twit({
  consumer_key:         'GcpGCN2anSPIUx92QfGync03i',
  consumer_secret:      'hIdD8PEZ7KbA7r5oqc8C2baebuJDqH7wn4rEndZYKbf0QevcH7',
  access_token:         '1039961884668166144-P9uyQ2JYnhTfK9H2WSpZEIkHQ0Jy0V',
  access_token_secret:  'Y9dnPiYaINfAOY2GHZ5wIf9Zqrgm9sh8jpD3UV91ufgxR',
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
  strictSSL:            true,     // optional - requires SSL certificates to be valid.
})

app.use(express.static(__dirname));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname+'/index.html'));
});

var timeout = false;

app.get('/api/tweets', function (req, res) {

  console.log(req.query)

  T.get('search/tweets',
    req.query,
    function(err, data, response) {
      let statuses = [];
      for(let status of data.statuses){
        status = getLatLng(status);
        if(status.latlng !== null){
          statuses.push(status)
        }
      }
      res.send(statuses);
  });

  var getLatLng = function(status){
    status.latlng = null;

    if(status.geo){
      let coords = status.geo.coordinates;
      status.latlng = {lat: coords[0], lng: coords[1]};
    }

    if(status.latlng === null &&
      status.place &&
      status.place.bounding_box &&
      status.place.bounding_box.coordinates &&
      status.place.bounding_box.coordinates[0] &&
      status.place.bounding_box.coordinates[0][0]
    ){
      let coords = status.place.bounding_box.coordinates[0][0];
      status.latlng = {lat: coords[1], lng: coords[0]};
    }
    return status;
  }
});

app.get('/api/san', function (req, res) {
  var sanFrancisco = [ '-122.75', '36.8', '-121.75', '37.8' ]
  var grandRapids = [ '-85.751534','42.88364','-85.568649','43.029053'];

  var stream = T.stream('statuses/filter', { locations: grandRapids })

  stream.on('tweet', function (tweet) {
    console.log(tweet)
  })
});





app.listen(3000)
console.log("Running at Port 3000");
