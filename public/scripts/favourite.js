$(() => {

  let myURL = window.location.href.split("/");
  let myId;
  if (myURL[3] === 'map') {
    myId = myURL[4];
  }

  $("#fave-button").click(function () {
    $.ajax({
      url: `/map/${myId}/favourite`,
      method: "POST"
    })
  })



});


<a id="fave-button"><button id="favorite">Favorite this map!</button></a>
