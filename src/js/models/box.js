define('BoxModel',[
  'backbone'
  ],
  function(
    Backbone
  ){

  var BoxModel = Backbone.Model.extend({

      initialize: function (data) {
        return this;
      },

      getModelId: function(){
        return this.cid;
      }
  });

  return BoxModel;

});
