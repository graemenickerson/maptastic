// users.js

// creates view for maps belonging to and favorited by a user.

$(() => {

  let myURL = window.location.href.split("/");
  const myId = myURL[myURL.length - 1];

  if (myId) {
    $.ajax({
      method: "GET",
      url: `/users/${myId}/maps`
    }).done((userMaps) => {

      for (const map of userMaps.myMaps) {
        $("div.made").append(`<span><a href= "/map/${map.id}">${map.title}</a><a href= "/map/${map.id}"><img src="${map.icon}"></a></span>`);
      }

      for (const map of userMaps.myContributions) {
        $("div.contributed").append(`<span><a href= "/map/${map.id}">${map.title}</a><a href= "/map/${map.id}"><img src="${map.icon}"></a></span>`);
      }

      for (const map of userMaps.myFaves) {
        $("div.favourited").append(`<span><a href= "/map/${map.id}">${map.title}</a><a href= "/map/${map.id}"><img src="${map.icon}"></a></span>`);
      }

    });
  }
});


