define('TweetModel',[
  'backbone'
  ],
  function(
    Backbone
  ){

  var TweetModel = Backbone.Model.extend({

      initialize: function (data) {
        this.id_str = data.id_str
        this.username = data.user.screen_name;
        return this;
      },

      getLink: function(){
        let link = `https://twitter.com/${this.username}/status/${this.id_str}`;
        return link;
      }
  });

  return TweetModel;

});
