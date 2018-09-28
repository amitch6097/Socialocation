define('ClusterModel',[
  'gmaps',
  'markerclustererplus',
  ],
  function(
    gmaps, markerclustererplus
  ){

    var ClusterModel = function(map, markers, events){

      var cluster = new MarkerClusterer(map, markers, {
        zoomOnClick: false,
        imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
        minimumClusterSize: 1
      });

      if(events !== undefined){
        // [{event:"event", context:"this", callback:"func"}, ...]
        events.forEach((item) => {
          google.maps.event.addListener(cluster, item.listen, (clusterItem) => {
            item.callback.apply(item.context, [clusterItem])
          });
        });
      }

      MarkerClusterer.prototype.clear = function(){
        this.clearMarkers();
        this.clusters_ = [];
        this.repaint();
      }

      return cluster;
    }

    return ClusterModel;
});
