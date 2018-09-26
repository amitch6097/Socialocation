define('PanelViewInstagram',[
  'backbone',
  'PanelView',
  'InstagramView',
  'InstagramCollection',
  'SingletonView',
  'EventMediator'
  ],
  function(
    Backbone, PanelView, InstagramView, InstagramCollection, SingletonView, EventMediator
  ){

    var PanelViewInstagram = PanelView.extend({

      events: {

      },

      initialize: function(options) {
        this.subView = InstagramView;
        this.uniqueName = "instagram";
        this.collection = new InstagramCollection(null, {bounds: options.bounds});

        this.heading = `
        <h1> Instagrams </h1>
        <div id="instagrams-options">
          <a href="/authorize_user" >Authorize</a>
        </div>
        `;

        PanelView.prototype.initialize.apply(this, [options]);
        this.collection.on("change:newElements", this.scrollView.render.bind(this.scrollView));

      },

    });

    return new SingletonView(PanelViewInstagram);
});
