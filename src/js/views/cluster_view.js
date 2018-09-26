define('ClusterView',[
  'backbone',
  'TweetView',
  'InstagramView',
  'gmaps'
  ],
  function(
    Backbone, TweetView, InstagramView, gmaps
  ){

    var VIEW_TYPES  = {
      "tweet" : TweetView,
      "instagram" : InstagramView
    }

    var ClusterView = Backbone.View.extend({

      events: {
        "click #holder-title-previous":"previous",
        "click #holder-title-next":"next"
      },

      initialize: function(data) {
        this.markers = [];
        this.index = 0;
        this.point;


        this.html = `
        <div class="holder-title" id="holder-map-title">
          <button id="holder-title-previous" >Previous</button>
          <button id="holder-title-next" >Next</button>
        </div>
        <div class="holder-items" id="holder-map-items">
        </div>
        `

        $(this.el).html(this.html);
        this.subElement = '#holder-map-items';

        this.el = data.el;

        return this;
      },

      populate: function(cluster){
        var point = this.fromLatLngToPoint(cluster.getCenter(), cluster.getMap());
        this.update(point, cluster.getMarkers());
      },

      fromLatLngToPoint: function(latLng, map) {
        var topRight = map.getProjection().fromLatLngToPoint(map.getBounds().getNorthEast());
        var bottomLeft = map.getProjection().fromLatLngToPoint(map.getBounds().getSouthWest());
        var scale = Math.pow(2, map.getZoom());
        var worldPoint = map.getProjection().fromLatLngToPoint(latLng);
        return new google.maps.Point((worldPoint.x - bottomLeft.x) * scale, (worldPoint.y - topRight.y) * scale);
      },

      render: function(){
        $(this.subElement).empty();
        this.$el.css({left:this.point.x, top:this.point.y});
        this.addTweet(this.marker.model);
        this.$el.css({visibility: "visible"});
        this.$el.css({ 'max-height': 'calc(100% - ' + this.point.y+ 'px)' });
        $(this.subElement).css({ 'max-height': 'calc(100% - ' + this.point.y+ 'px)' });
      },

      empty: function(){
        this.$el.css({visibility: "hidden"});
        $(this.subElement).empty();
      },

      next: function(){
        this.index = this.index+1;

        $("#holder-title-previous").prop("disabled",false);
        if(this.index >= this.markers.length - 1){
          $("#holder-title-next").prop("disabled",true);
        }

        this.marker = this.markers[this.index];
        this.render();
      },

      previous: function(){
        this.index = this.index-1;

        $("#holder-title-next").prop("disabled",false);
        if(this.index <= 0){
          $("#holder-title-previous").prop("disabled",true);
        }

        this.marker = this.markers[this.index];
        this.render();
      },

      update: function(point, markers){
        this.markers = markers;
        this.point = point;
        this.index = 0;

        $("#holder-title-next").prop("disabled",false);
        $("#holder-title-previous").prop("disabled",true);
        if(this.markers.length === 1){
          $("#holder-title-next").prop("disabled",true);
        }

        this.marker = this.markers[0];
        this.render();
      },

      addTweet: function(model){
        console.log("Double>")
        let modelType = model.modelType
        let viewObject = VIEW_TYPES[modelType];
        let tweet = new viewObject({
          el: this.subElement,
          model: model,
          width: 100
        });
        tweet.render();
      },

    });

    return ClusterView;
});
