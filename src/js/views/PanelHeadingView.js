define('PanelHeadingView',[
  'backbone'
  ],
  function(
    Backbone
  ){

    var PanelHeadingView = Backbone.View.extend({

      initialize: function(data) {
        this.html = `
        <h1> Tweets </h1>
        <div id="twitter-search">
          <input type="text">
          <button>Submit</button>
        </div>
        <div id="twitter-buttons">
          <button class="button-twitter-result-type" data-url="popular" >Popular</button>
          <button class="button-twitter-result-type" data-url="recent" >Recent</button>
          <button class="button-twitter-result-type" data-url="mixed" >Mixed</button>
        </div>
        `;
        this.$el.html(this.html);
        return this;

      },

      render: function(){
        return this;
      }

    });

    return PanelHeadingView;
});