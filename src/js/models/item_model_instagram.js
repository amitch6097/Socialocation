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
        this.id_str = data.id_str;
        this.viewType = data.viewType;
        this.selected = false;
        this.visible = false;
      },

      getLink: function(){
        return this.node.thumbnail_src;
      },

  });

  return ItemModelInstagram;

});
