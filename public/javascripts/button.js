$("#create").on("click", function(e){
  e.preventDefault()
  const info = {
    name: $("#placeName").val(),
    address:$("#placeAddress").val(),
    lat: $("#placeLat").val(),
    lng: $("#placeLng").val()
  }
  $.ajax({
    method: "POST",
    url : "http://localhost:3000/map",
    data : info,
    dataType: "text",
    success: getPlaces(map),
    next: marker.setMap(map)

  })
})
