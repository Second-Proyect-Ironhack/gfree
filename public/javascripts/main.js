function initMap() {
   var position = {
  	lat: 41.3977381,
  	lng: 2.190471916};

  var map = new google.maps.Map(
    document.getElementById('map'),
    {
      zoom: 15,
      center: position
    }
  )
    locate(position, map)
    var input = /** @type {!HTMLInputElement} */(
            document.getElementById('autocomplete'));

        var autocomplete = new google.maps.places.Autocomplete(input);
        autocomplete.bindTo('bounds', map);

        var infowindow = new google.maps.InfoWindow();
        var marker = new google.maps.Marker({
          map: map,
          anchorPoint: new google.maps.Point(0, -29)
        });

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
            map.setZoom(17);  // Why 17? Because it looks good.
          }
          marker.setIcon(/** @type {google.maps.Icon} */({
            url: place.icon,
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(35, 35)
          }));
          marker.setPosition(place.geometry.location);
          marker.setVisible(true);

          if(place.photos !== undefined){
          infowindow.setContent('<div><img src='+place.photos[0].getUrl({'maxWidth': 100, 'maxHeight': 100})+'><h3>' + place.name + '</h3><br>' + place.formatted_address);
        }else{
          infowindow.setContent('<div><h3>' + place.name + '</h3><br>' + place.formatted_address);
        }
          infowindow.open(map, marker);
          console.log(place.geometry.location.lat())
          fillInputs(place)
        });
}
window.getRestaurants= function(){
  $.ajax ({
    method: "get",
    url : "http://localhost:27017/gfree-development/places",
    dataType : 'json',
  }).then(data => console.log(data)).catch(e => console.log(e))
}

function locate(position, map){
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(function(position){
      position = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }
      map.setCenter(position)
    })
  }
}
