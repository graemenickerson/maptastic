$(() => {

  let myURL = window.location.href.split("/");
  const myId = myURL[myURL.length -1];

  if (myId) {
    $.ajax({
      method: "GET",
      url: `/map/${myId}/points`
    }).done((points) => {
      let markers = []
      for(point of points.points) {
        L.marker([point.lat, point.long]).addTo(map).bindPopup(`
        Title: ${point.title}
        Description: ${point.description}
        `);
        let markerL = [point.lat, point.long]
        markers.push(markerL)
      }
      map.fitBounds(markers)
      zoom = map.getZoom()
      if (zoom > 14) {
        map.setZoom(15);
      }
    });
  }
});


