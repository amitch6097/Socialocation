define('MarkerModel',[
  'gmaps',
  ],
  function(
    gmaps
  ){

    var MarkerModel = function(position, cid){

      var marker = new google.maps.Marker({
        position: position,
        label: cid
      });

      return marker;

    }

    return MarkerModel;
});
