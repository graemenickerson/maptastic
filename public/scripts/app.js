$(() => {

  let myURL = window.location.href.split("/");
  const myId = myURL[myURL.length -1];

  if (myId) {
    $.ajax({
      method: "GET",
      url: `/map/${myId}/points`
    }).done((points) => {
      for(point of points.points) {
        L.marker([point.lat, point.long]).addTo(map).bindPopup(`
        Title: ${point.title}
        Description: ${point.description}

        `);
        map.setView([point.lat, point.long], 13);
      }
    });
  }
});


