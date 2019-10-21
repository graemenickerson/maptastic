$(() => {

  let myURL = window.location.href.split("/");
  let myId;
  if (myURL[3] === 'map') {
    myId = myURL[4];
  }
  if (myId && myId !== 'map' && myId !== 'addpoint') {
    $.ajax({
      method: "GET",
      url: `/map/${myId}/points`
    }).done((points) => {
      let markers = []
      for(point of points.points) {
        const point_icon = L.icon({
          iconUrl: point.img_loc,
          iconSize:     [40, 45], // size of the icon
          iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
          shadowAnchor: [4, 62],  // the same for the shadow
          popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
        });

        L.marker([point.lat, point.long], {icon: point_icon}).addTo(map).bindPopup(`
        <b>${point.title}</b> <br>
        ${point.description} <br>
        <img src=${point.picture} max width="150"  max height="150"> <br>
        `);
        let markerL = [point.lat, point.long]
        markers.push(markerL)
      }
      map.fitBounds(markers)
      zoom = map.getZoom()
      if (zoom > 14) {
        map.setZoom(14);
      }
    });
  }
});


