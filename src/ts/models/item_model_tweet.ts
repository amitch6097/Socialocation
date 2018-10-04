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

      initialize: function (data: any) {
        this.id_str = data.id_str;
      },

      getLink: function(): string{
        let username: string = this.get('username');
        let id_str: string= this.get('id_str');
        let link: string = `https://twitter.com/${username}/status/${id_str}`;
        return link;
      }
  });

  return ItemModelTweet;

});
