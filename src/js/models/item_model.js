define('ItemModel',[
  'backbone'
  ],
  function(
    Backbone
  ){

  var ItemModel = Backbone.Model.extend({


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
        obj[this.id] = this.latlng;
        return obj;
      },

      getLink: function(){
        throw "NEED TO IMPLMENT GET LINK";
      }
  });

  return ItemModel;

});
