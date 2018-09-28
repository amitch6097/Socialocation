define('MarkerModel',[
  'gmaps',
  ],
  function(
    gmaps
  ){

    var MarkerModel = function(tweetModel){
      const latlng = tweetModel.get('latlng');

      var marker = new google.maps.Marker({
        position: {lat: latlng.lat, lng: latlng.lng },
        label: tweetModel.id_str,
        model: tweetModel
      });

      return marker;

    }

    return MarkerModel;
});
