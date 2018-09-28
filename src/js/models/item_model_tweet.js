define('ItemModelTweet',[
  'backbone',
  'ItemModel',
  ],
  function(
    Backbone, ItemModel
  ){

  var ItemModelTweet = ItemModel.extend({

      initialize: function (data) {
        this.modelType = "twitter";
        this.id_str = data.id_str;
        this.username = data.user.screen_name;
        this.latlng = data.latlng;
        this.selected = false;
        this.visible = false;
        this.data = data;
      },

      getLink: function(){
        let link = `https://twitter.com/${this.username}/status/${this.id_str}`;
        return link;
      }
  });

  return ItemModelTweet;

});
