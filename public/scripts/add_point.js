// add_point.js

let marker = {};
map.on('click', function(e) {
  if (marker !== undefined) {
    map.removeLayer(marker);
  }
  marker = new L.marker(e.latlng).addTo(map);
});
