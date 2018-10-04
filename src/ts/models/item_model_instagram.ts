define('ItemModelInstagram',[
  'backbone',
  'ItemModel'
  ],
  function(
    Backbone, ItemModel
  ){

  var ItemModelInstagram = ItemModel.extend({

      defaults:{
        'modelType': "instagram",
        'selected': false,
        'visible': false,
      },

      initialize: function (data: any) : void{
        this.set('latlng', {lat: data.lat, lng:data.lng});
        this.id_str = data.id_str;
      },

      getLink: function(): string{
        return this.get('thumbnail_src');
      },

  });

  return ItemModelInstagram;

});
