define('TweetView',[
  'backbone',
  'tpl!views/templates/tweet_view.tpl',
  ],
  function(
    Backbone, TweetViewTemplate
  ){

    var TweetView = Backbone.View.extend({

      initialize: function(data: any): void {
        this.model = data.model;
        this.el = data.el;

        this.template = TweetViewTemplate;
        let link: string = this.model.getLink();
        this.html = this.template({
          link: link,
        });
      },

      render: function(): void {
        $(this.el).append(this.html);
      },

    });

    return TweetView;
});
