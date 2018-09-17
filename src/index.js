var express = require('express')
var app = express()
var path = require("path");
var Twit = require('twit')

var T = new Twit({
  consumer_key:         'lLytUaErwoz6frJrKwY9oca4c',
  consumer_secret:      'IBntWThegBjmOw3XX7cCTE2M2zomcAGdm8pfxBMlkiZxM6AJo2',
  access_token:         '1039961884668166144-D2JFUvhR3CCvdg9xWDbiATZeNfsmkG',
  access_token_secret:  'MsPGWHG55qPWbPG8eKagfEWeqrnmgEzbvyBREn4aXkq2P',
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
  strictSSL:            true,     // optional - requires SSL certificates to be valid.
})

app.use(express.static(__dirname));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname+'/index.html'));
});

app.get('/api/tweets', function (req, res) {
  console.log(req.query)
  T.get('search/tweets',
    req.query,
    function(err, data, response) {
      res.send(data.statuses);
  });
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
