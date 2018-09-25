define('PanelHeadingView',[
  'backbone'
  ],
  function(
    Backbone
  ){

    var PanelHeadingView = Backbone.View.extend({

      initialize: function(data) {
        this.el = data.el;

        this.html = `
        <button id="twitter-remove" >Remove</button>
        <h1> Tweets </h1>
        <div id="twitter-search">
          <input id="tweet-search-text" type="text">
          <button id="tweet-search-submit" >Submit</button>
        </div>
        `;

        $(this.el).html(this.html);
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
