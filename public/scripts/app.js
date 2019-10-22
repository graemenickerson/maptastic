// app.js

// Takes mapId and populates the map with points that belong to it.
$(() => {

  let myURL = window.location.href.split("/");
  let myId;
  if (myURL[3] === 'map') {
    myId = myURL[4];
  }
  if (myId && myId !== 'map' && myId !== 'addpoint' && myId !== 'favourite') {
    $.ajax({
      method: "GET",
      url: `/map/${myId}/points`
    }).done((points) => {
      let markers = [];
      for (let point of points.points) {
        const point_icon = L.icon({
          iconUrl: point.img_loc,
          iconSize:     [40, 45], // size of the icon
          iconAnchor:   [20, 45], // point of the icon which will correspond to marker's location
          popupAnchor:  [0, -45] // point from which the popup should open relative to the iconAnchor
        });

        L.marker([point.lat, point.long], {icon: point_icon}).addTo(map).bindPopup(`
        <b>${point.title}</b> <br>
        ${point.description} <br>
        <img src=${point.picture} max width="150"  max height="150"> <br>
        `);
        let markerL = [point.lat, point.long];
        markers.push(markerL);
      }
      map.fitBounds(markers);
      zoom = map.getZoom();
      if (zoom > 14) {
        map.setZoom(14);
      }
    });
  }
});


