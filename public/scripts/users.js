$(() => {

  let myURL = window.location.href.split("/");
  const myId = myURL[myURL.length -1];

  console.log(myId);
  if (myId) {
    $.ajax({
      method: "GET",
      url: `/users/${myId}/maps`
    }).done((userMaps) => {
      $("span.myMapList").append("<h4>Maps I Made</h4>")
      for (const map of userMaps.myMaps) {
        $("span.myMapList").append(`<a href= "/map/${map.id}">${map.title}</a>`);
      }
      $("span.myMapList").append("<h4>Maps I Favourited</h4>")
      for (const map of userMaps.myFaves) {
        $("span.myMapList").append(`<a href= "/map/${map.id}">${map.title}</a>`);
      }
      $("span.myMapList").append("<h4>Maps I Contributed To</h4>")
      for (const map of userMaps.myContributions) {
        $("span.myMapList").append(`<a href= "/map/${map.id}">${map.title}</a>`);
      }
    });
  }
});


