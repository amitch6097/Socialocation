"use strict";
define('MarkerModel', [
    'gmaps',
], function (gmaps) {
    var MarkerModel = function (model) {
        const latlng = model.get('latlng');
        var marker = new google.maps.Marker({
            position: { lat: latlng.lat, lng: latlng.lng },
            label: model.id_str,
        });
        marker.model = model;
        return marker;
    };
    return MarkerModel;
});
//# sourceMappingURL=marker_model.js.map