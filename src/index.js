var express = require('express')
var app = express();
var path = require("path");
var Twit = require('twit');
var ig = require('instagram-node').instagram();
var request = require("request");



var T = new Twit({
  consumer_key:         'GcpGCN2anSPIUx92QfGync03i',
  consumer_secret:      'hIdD8PEZ7KbA7r5oqc8C2baebuJDqH7wn4rEndZYKbf0QevcH7',
  access_token:         '1039961884668166144-P9uyQ2JYnhTfK9H2WSpZEIkHQ0Jy0V',
  access_token_secret:  'Y9dnPiYaINfAOY2GHZ5wIf9Zqrgm9sh8jpD3UV91ufgxR',
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
  strictSSL:            true,     // optional - requires SSL certificates to be valid.
});

ig.use({
  client_id: '91a2375259584d71b13334976dc499f3',
  client_secret: '5fda7bc6723643859cabc79aa5a1c136'
});

var redirect_uri = 'http://localhost:3000/handleauth';
var access_token = '8578977274.91a2375.539e53109dd14cee854b99d1307d720b';
var timeout = false;



exports.authorize_user = function(req, res) {
  console.log("Authorizing ...")
  res.redirect(ig.get_authorization_url(redirect_uri, { scope: ['public_content'], state: 'a state' }));
};

exports.handleauth = function(req, res) {
  ig.authorize_user(req.query.code, redirect_uri, function(err, result) {
    if (err) {
      console.log(err.body);
      res.send("Didn't work");
    } else {
      console.log('Access token is ' + result.access_token);
      access_token = result.access_token;
      res.redirect('/');
    }
  });
};

// This is where you would initially send users to authorize
app.get('/authorize_user', exports.authorize_user);
// This is your redirect URI
app.get('/handleauth', exports.handleauth);

app.use(express.static(__dirname));

app.get('/', function (req, res, next) {
  res.sendFile(path.join(__dirname+'/index.html'));
});

app.get('/api/instagram', function (req, res) {
  let query = req.query;
  let lat = query.lat;
  let lng = query.lng;

  console.log(`getting instagram location id for ${lat}, ${lng}...`);

  var sendDataBack = function(data){
    res.send(data);
  }

  request({
    method: 'GET',
    url: 'https://api.instagram.com/v1/locations/search',
    qs:{
      lat: lat,
      lng: lng,
      access_token: access_token
    },
    headers:{
      'Postman-Token': '68958031-0dd5-47a0-bf4e-fa4be61f6936',
      'Cache-Control': 'no-cache',
      Authorization: 'OAuth oauth_consumer_key=\\"91a2375259584d71b13334976dc499f3\\",oauth_signature_method=\\"HMAC-SHA1\\",oauth_timestamp=\\"1537976685\\",oauth_nonce=\\"pMKyFM4qk4U\\",oauth_version=\\"1.0\\",oauth_signature=\\"h9EUYXScC80Pa86G55YPWP0lp4s%3D\\"'
    }
   }, function (error, response, body) {
    if (error) throw new Error(error);
    body = JSON.parse(body);
    if(!body.data) return;
    let locations = body.data.map((dataPoint) => {
        return { id:  dataPoint.id, lat: dataPoint.latitude, lng: dataPoint.longitude };
    });
    let itemsProcessed = 0;
    let instagrams = [];

    locations.forEach((location, index) => {
      console.log(`getting location: ${location.id} instagrams ...`)
      request({
        method: 'GET',
        url: `https://www.instagram.com/explore/locations/${location.id}/`,
        qs: { __a: '1' },
        headers:{
          'Postman-Token': 'c0a3a8a1-9913-4d4d-baa6-99ed98bdd408',
          'Cache-Control': 'no-cache'
        }
      }, function (error, response, body) {
        if (error) throw new Error(error);
        body = JSON.parse(body);
        if(
          body.graphql &&
          body.graphql.location &&
          body.graphql.location.edge_location_to_top_posts &&
          body.graphql.location.edge_location_to_top_posts.edges
        ){
          console.log("... has top posts! ")

          // locations[index]['top_posts'] = body.graphql.location.edge_location_to_top_posts.edges;
          // edge_location_to_media
          let edges = body.graphql.location.edge_location_to_media.edges;
          let lat = locations[index].lat;
          let lng = locations[index].lng;

          edges.forEach((edge) => {
            edge['lat'] = lat;
            edge['lng'] = lng;
            edge['id'] = edge.node.id;
            instagrams.push(edge)
          })
        }
        itemsProcessed++;
        if(itemsProcessed === locations.length){
          sendDataBack(instagrams)
        }
      });
    });
  });

});



app.get('/api/tweets', function (req, res) {

  T.get('search/tweets',
    req.query,
    function(err, data, response) {

      let statuses = [];
      if(!data.statuses) {
        res.send([]);
        return;
      }
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
