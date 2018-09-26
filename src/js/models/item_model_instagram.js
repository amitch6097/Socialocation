define('ItemModelInstagram',[
  'backbone',
  'ItemModel'
  ],
  function(
    Backbone, ItemModel
  ){

  var ItemModelInstagram = ItemModel.extend({

      initialize: function (data) {
        this.modelType = "instagram";
        this.node = data.node;
        this.latlng = {lat: data.lat, lng:data.lng};
        this.id = data.id;
        this.viewType = data.viewType;
      },

      getLink: function(){
        return this.node.thumbnail_src;
      },

  });

  return ItemModelInstagram;

});
