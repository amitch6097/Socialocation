define('ClusterMarkerModel',[
  'gmaps',
  'gmapsTwo',
  ],
  function(
    gmaps, gmapsTwo
  ){

    var ClusterMarkerModel = function(map, markers, events){


      // ANDREW HOW TO OVERIDE FUNCTIONS
      // function ClusterMaker(map, marker, args) {
      //   MarkerClusterer.call(this, map, marker, args);
      // }
      // ClusterMaker.prototype = Object.create(MarkerClusterer.prototype)
      // ClusterMaker.prototype.constructor = ClusterMaker;


      // var cluster = new ClusterMaker(map, markers, {
      //   zoomOnClick: false,
      //   imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
      //   minimumClusterSize: 1
      // });

      // ClusterMaker.prototype.onAddCluster = function(options){
      //   MarkerClusterer.prototype.onAddCluster.call(this, arguments);
      // }

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
