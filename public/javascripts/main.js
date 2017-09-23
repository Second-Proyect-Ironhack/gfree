var map;
var marker;
var infowindow
var markers = []
function initMap() {
  var position = {
    lat: 41.3977381,
    lng: 2.190471916
  };

  map = new google.maps.Map(
    document.getElementById('map'), {
      zoom: 14,
      center: position
    }
  )
  locate(position, map)
  var input = /** @type {!HTMLInputElement} */ (
    document.getElementById('autocomplete'));

  var autocomplete = new google.maps.places.Autocomplete(input);
  autocomplete.bindTo('bounds', map);

infowindow = new google.maps.InfoWindow();
  marker = new google.maps.Marker({
    map: map,
    anchorPoint: new google.maps.Point(0, -29)
  });

   getPlaces("places")
  // marker.setMap(map)


  autocomplete.addListener('place_changed', function() {
    infowindow.close();
    marker.setVisible(false);
    var place = autocomplete.getPlace();
    if (!place.geometry) {
      // User entered the name of a Place that was not suggested and
      // pressed the Enter key, or the Place Details request failed.
      window.alert("No details available for input: '" + place.name + "'");
      return;
    }

    // If the place has a geometry, then present it on a map.
    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(17); // Why 17? Because it looks good.
    }
    marker.setIcon( /** @type {google.maps.Icon} */ ({
      // url: place.icon,
      size: new google.maps.Size(71, 71),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(35, 35)
    }));
    marker.setPosition(place.geometry.location);
    marker.setVisible(true);

    if (place.photos !== undefined) {
      infowindow.setContent('<div><img src=' + place.photos[0].getUrl({
        'maxWidth': 100,
        'maxHeight': 100
      }) + '><h5>' + place.name + '</h5><br>' + place.formatted_address + '</div>');
    } else {
      infowindow.setContent('<div><h5>' + place.name + '</h5><br>' + place.formatted_address+'</div>');
    }

    infowindow.open(map, marker);
    console.log(place.geometry.location.lat())
     fillInputs(place)
  });
}

function locate(position, map) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      position = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }
      map.setCenter(position)
    })
  }
}
