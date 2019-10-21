$(() => {

  let myURL = window.location.href.split("/");
  const myId = myURL[myURL.length -1];

  console.log(myId);
  if (myId) {
    $.ajax({
      method: "GET",
      url: `/users/${myId}/maps`
    }).done((userMaps) => {

      for (const map of userMaps.myMaps) {
        $("div.made").append(`<span><a href= "/map/${map.id}">${map.title}</a></span>`);
      }

      for (const map of userMaps.myContributions) {
        $("div.contributed").append(`<span><a href= "/map/${map.id}">${map.title}</a></span>`);
      }

      for (const map of userMaps.myFaves) {
        $("div.favourited").append(`<span><a href= "/map/${map.id}">${map.title}</a></span>`);
      }




    });
  }
});


