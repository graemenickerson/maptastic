// app.js
$(() => {
  //updates the coordinate and zoom values in _newMap ejs file to match those of the
  //map. Gets called on load as well as when map moves. Used when NEW MAP is being created
  const setCoordsInEjs = function() {
    document.getElementById('centerlat').value = map.getCenter()['lat'];
    document.getElementById('centerlong').value = map.getCenter()['lng'];
    document.getElementById('zoom').value =  map.getZoom();
  };

  if (document.getElementById('centerlat')) {
    setCoordsInEjs();
  }
  const myURL = window.location.href.split("/");
  const mapInd = myURL.indexOf("map");
  const mapId = myURL[mapInd + 1];
  let editMode = 0;

  //if the url has the id followed by "edit point"
  if (myURL[mapInd + 2] === 'editpoint') {
    editMode = 1;
  }
  //if the map already has an ID (not currently being created)
  if (mapId) {
    // Takes mapId and populates the map with points that belong to it.
    $.ajax({
      method: "GET",
      url: `/map/${mapId}/points`
    }).done((points) => {
      let markers = [];
      for (let point of points.points) {
        if (point.active) {
          const point_icon = L.icon({
            iconUrl: point.img_loc,
            iconSize:     [40, 45], // size of the icon
            iconAnchor:   [20, 45], // point of the icon which will correspond to marker's location
            popupAnchor:  [0, -45] // point from which the popup should open relative to the iconAnchor
          });
          //add the marker to the map with info from the database in the popup
          L.marker([point.lat, point.long], {icon: point_icon}).addTo(map).bindPopup(`
          <h1>${point.title}</h1>
          <h4>${point.description}</h4>
          <img src=${point.picture}  width="150" height="150"> <br>
          <i><a href="/users/${point.user_id}">created by: ${point.user_name}</a></i>
          `).on("click", function(event) {
            //on click, if in edit mode, fill out the edit form with the values from that marker
            if (editMode) {
              document.getElementById('title').value = point.title;
              document.getElementById('description').value = point.description;
              document.getElementById('image').value = point.picture;
              dropdown = document.getElementById('dropdown');
              dropdown.value = point.keyword_id;
              dropdown.text = point.word;
              document.getElementById('pointid').value = point.id;
              document.getElementById('deletepointid').value = point.id;
            }
          });
          let markerL = [point.lat, point.long];
          markers.push(markerL);
        }
      }

      /*
      if you're loading map from database
      */
      //if map is in database but there are less than 2 points in that map, set the map view to be the values from the map
      //as saved in the database
      if (document.getElementById('maplat') && markers.length < 2) {
        let coords = [document.getElementById('maplat').value, document.getElementById('maplong').value];
        let zoom   = document.getElementById('mapzoom').value;
        map.setView(coords, zoom);
      } else {
        //if there are more than 2 points in that map, set the view to the extent of the points
        map.fitBounds(markers);
        let zoom = map.getZoom();
        if (zoom > 14) {
          map.setZoom(14);
      }
    }
    });

  //If you're creating a new map and you move the extent
  //update the hidden values in the form so that it is saved in the db
  } else {
    map.on("moveend", function() {
      setCoordsInEjs();
    });
  }
});
