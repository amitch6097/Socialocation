define('ItemModel',[
  'backbone'
  ],
  function(
    Backbone
  ){

  var ItemModel = Backbone.Model.extend({
    
      show: function() : void {
        this.changeVisible(true);
        this.updateView();
      },

      hide: function() : void {
        this.changeVisible(false);
        this.updateView();
      },

      changeVisible: function(value: boolean): void {
        this.set('visible', value);
      },
      updateView: function(): void {
        this.trigger('change:update');
      },

      getLink: function(): string{
        throw "NEED TO IMPLMENT GET LINK";
      }
  });

  return ItemModel;

});
