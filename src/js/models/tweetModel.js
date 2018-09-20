define('TweetModel',[
  'backbone'
  ],
  function(
    Backbone
  ){

  var TweetModel = Backbone.Model.extend({

      initialize: function (data) {
        this.modelType = "tweet";
        this.id_str = data.id_str
        this.username = data.user.screen_name;
        // this.locationNamde = data.place.name;
        this.latlng = null;
        this.selected = false;

        // {lat: 42.883679, lng: -85.751406}

        if(data.geo){
          let latlng = data.geo.coordinates;
          this.latlng = {lat: latlng[0], lng: latlng[1]};
        }

        if(this.latlng === null &&
          data.place &&
          data.place.bounding_box &&
          data.place.bounding_box.coordinates &&
          data.place.bounding_box.coordinates[0] &&
          data.place.bounding_box.coordinates[0][0]
        ){
          let latlng = data.place.bounding_box.coordinates[0][0];
          this.latlng = {lat: latlng[1], lng: latlng[0]};
        }

      },

      withinBounds: function(bounds){
        if(this.latlng === null){
          return false;
        }

        let center = bounds.center;
        let latlng = this.latlng;

        let dist = Math.sqrt(
          (Math.abs(latlng.lat*100 - center.lat*100) + Math.abs(latlng.lng*100-center.lng*100))
        );

        let maxDist = bounds.dist*100;

        if(dist < maxDist*2){
          return true
        }

        return false;
      },

      getLatLng: function(){
        if(this.latlng === null){
          return null;
        }
        let obj = {};
        obj[this.cid] = this.latlng;
        return obj;
      },

      getLink: function(){
        let link = `https://twitter.com/${this.username}/status/${this.id_str}`;
        return link;
      }
  });

  return TweetModel;

});
