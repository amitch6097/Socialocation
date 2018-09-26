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
        this.cid = data.id_str;
        this.username = data.user.screen_name;
        // this.locationNamde = data.place.name;
        this.latlng = data.latlng;
        this.selected = false;
        this.visible = false;
        this.data = data;


        // ANDREW NOW HANDLED IN SERVER
        // // {lat: 42.883679, lng: -85.751406}
        //
        // if(data.geo){
        //   let latlng = data.geo.coordinates;
        //   this.latlng = {lat: latlng[0], lng: latlng[1]};
        // }
        //
        // if(this.latlng === null &&
        //   data.place &&
        //   data.place.bounding_box &&
        //   data.place.bounding_box.coordinates &&
        //   data.place.bounding_box.coordinates[0] &&
        //   data.place.bounding_box.coordinates[0][0]
        // ){
        //   let latlng = data.place.bounding_box.coordinates[0][0];
        //   this.latlng = {lat: latlng[1], lng: latlng[0]};
        // }

      },

      show: function(){
        this.changeVisible(true);
        this.updateView();
      },

      hide: function(){
        this.changeVisible(false);
        this.updateView();
      },

      changeVisible: function(value){
        this.visible = value;
      },
      updateView: function(){
        this.trigger('change:updateView')
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
