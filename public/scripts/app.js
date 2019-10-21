$(() => {

  let myURL = window.location.href.split("/");
  const myId = myURL[myURL.length -1];

  console.log(myURL);
  console.log(myId);

  if (myId) {
    $.ajax({
      method: "GET",
      url: `/map/${myId}/points`
    }).done((points) => {
      for(point of points.points) {
        L.marker({lat: `${point.lat}`, lng: `${point.long}`}).addTo(map);
      }
    });
  }


});


