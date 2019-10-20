$(() => {
  $.ajax({
    method: "GET",
    url: "/map/id"
  }).done((points) => {
    for(point of points.points) {
      L.marker({lat: `${point.lat}`, lng: `${point.long}`}).addTo(map);
    }
  });
});


