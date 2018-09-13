define('TweetModel',[
  'backbone'
  ],
  function(
    Backbone
  ){

  var TweetModel = Backbone.Model.extend({

      initialize: function (data) {
        this.link = data.link;
        return this;
      },

      getLink: function(){
        return this.link;
      }
  });

  return TweetModel;

});
