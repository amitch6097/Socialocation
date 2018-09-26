define('InstagramView',[
  'backbone'
  ],
  function(
    Backbone
  ){

    var InstagramView = Backbone.View.extend({

      initialize: function(data) {
        this.model = data.model;
        this.el = data.el;
        this.width = data.width === undefined ? 300 : data.width;

        this.template = _.template(`
          <img src="<%= link %>" alt="Smiley face" height="300" width="300">
        `);

        let link = this.model.getLink();

        this.html = this.template({
          link: link
        });
        this.render();

      },

      render: function() {
        $(this.el).append(this.html);
        return this;
      },

    });

    return InstagramView;
});
