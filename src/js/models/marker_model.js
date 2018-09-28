define('MarkerModel',[
  'gmaps',
  ],
  function(
    gmaps
  ){

    var MarkerModel = function(tweetModel){

      var marker = new google.maps.Marker({
        position: {lat: tweetModel.latlng.lat, lng: tweetModel.latlng.lng },
        label: tweetModel.id_str,
        model: tweetModel
      });

      return marker;

    }

    return MarkerModel;
});
