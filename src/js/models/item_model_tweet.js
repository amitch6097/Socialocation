define('ItemModelTweet',[
  'backbone',
  'ItemModel',
  ],
  function(
    Backbone, ItemModel
  ){

  var ItemModelTweet = ItemModel.extend({

      defaults:{
        'modelType': "twitter",
        'selected': false,
        'visible': false
      },

      initialize: function (data) {
        this.id_str = data.id_str;
      },

      getLink: function(){
        let username = this.get('user').screen_name;
        let id_str = this.get('id_str');
        let link = `https://twitter.com/${username}/status/${id_str}`;
        return link;
      }
  });

  return ItemModelTweet;

});
