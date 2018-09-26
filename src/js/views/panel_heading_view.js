define('PanelHeadingView',[
  'backbone'
  ],
  function(
    Backbone
  ){

    var PanelHeadingView = Backbone.View.extend({

      initialize: function(data) {
        this.el = data.el;

        this.template = _.template(`
        <button id="twitter-remove" >Remove</button>
        <%= heading %>
        `);

        $(this.el).html(this.template({heading: data.heading}));
        return this;

      },

      render: function(){
        return this;
      }

    });

    return PanelHeadingView;
});


// <h1> Tweets </h1>
// <div id="twitter-search">
//   <input id="tweet-search-text" type="text">
//   <button id="tweet-search-submit" >Submit</button>
// </div>
// <div id="twitter-buttons">
//   <button class="button-twitter-result-type" data-url="popular" >Popular</button>
//   <button class="button-twitter-result-type" data-url="recent" >Recent</button>
//   <button class="button-twitter-result-type" data-url="mixed" >Mixed</button>
// </div>
