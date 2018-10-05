require('dotenv').config()

var express = require('express')
var app = express();
var path = require("path");
var Twit = require('twit');
var ig = require('instagram-node').instagram();
var request = require("request");

var T = new Twit({
  consumer_key:         process.env.TWITTER_CONSUMER_KEY,
  consumer_secret:      process.env.TWITTER_CONSUMER_SECRET,
  access_token:         process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret:  process.env.TWITTER_ACCESS_TOKEN_SECRET,
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
  strictSSL:            true,     // optional - requires SSL certificates to be valid.
});

ig.use({
  client_id: process.env.INSTAGRAM_CLIENT_ID,
  client_secret: process.env.INSTAGRAM_CLIENT_SECRET,
});

var redirect_uri = process.env.INSTAGRAM_REDIRECT_URI;
var access_token = process.env.INSTAGRAM_ACCESS_TOKEN;
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

  try {

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

        try {
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
            if (error){
              itemsProcessed++;
              if(itemsProcessed === locations.length){
                sendDataBack(instagrams)
              }
            }
            try{
              body = JSON.parse(body);
            } catch(err){
              itemsProcessed++;
              if(itemsProcessed === locations.length){
                sendDataBack(instagrams)
              }
            }
            if(
              body &&
              body.graphql &&
              body.graphql.location &&
              body.graphql.location.edge_location_to_top_posts &&
              body.graphql.location.edge_location_to_top_posts.edges
            ){
              console.log("... has top posts! ")

              let edges = body.graphql.location.edge_location_to_top_posts.edges;
              let lat = locations[index].lat;
              let lng = locations[index].lng;

              for(edge of edges){
                edge['lat'] = lat;
                edge['lng'] = lng;
                edge['id_str'] = edge.node.id;
                edge['thumbnail_src'] = edge.node.thumbnail_src;
                delete edge['node']
                instagrams.push(edge)
              }
            }
            itemsProcessed++;
            if(itemsProcessed === locations.length){
              sendDataBack(instagrams)
            }
          });
        } catch(err){
          console.log("second requestion error")
          itemsProcessed++;
          if(itemsProcessed === locations.length){
            sendDataBack(instagrams)
          }
        }
      });
    });
  } catch(err){
    console.log("initial requestion error", err)
  }

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
    let newStatus = {latlng: null}
    // status.latlng = null;

    if(status.geo){
      let coords = status.geo.coordinates;
      newStatus.latlng = {lat: coords[0], lng: coords[1]};
    }

    if(newStatus.latlng === null &&
      status.place &&
      status.place.bounding_box &&
      status.place.bounding_box.coordinates &&
      status.place.bounding_box.coordinates[0] &&
      status.place.bounding_box.coordinates[0][0]
    ){
      let coords = status.place.bounding_box.coordinates[0][0];
      newStatus.latlng = {lat: coords[1], lng: coords[0]};
    }

    newStatus['id_str'] = status.id_str;
    if(status.user && status.user.screen_name){
      newStatus['username'] = status.user.screen_name;
    }

    return newStatus;
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






var port = process.env.PORT || 3000;

app.listen(port)
console.log("Running at Port 3000");
