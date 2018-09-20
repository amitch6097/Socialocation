define('ClusterMarkerModel',[
  'gmaps',
  'gmapsTwo',
  ],
  function(
    gmaps, gmapsTwo
  ){

    var ClusterMarkerModel = function(map, markers, events){

      var cluster = new MarkerClusterer(map, markers, {
        zoomOnClick: false,
        imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
        minimumClusterSize: 1
      });

      // [{event:"event", context:"this", callback:"func"}, ...]
      events.forEach((item) => {
        google.maps.event.addListener(cluster, item.listen, (clusterItem) => {
          item.callback.apply(item.context, [clusterItem])
        });
      });

      return cluster;
    }

    return ClusterMarkerModel;
});
