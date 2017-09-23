
function fillInputs(place) {
  $('#placeAddress').val(place.formatted_address)
  $('#placeLat').val(place.geometry.location.lat())
  $('#placeLng').val(place.geometry.location.lng())
  if(place.photos !== undefined){
  $("#placePicture").val(place.photos[0].getUrl({'maxWidth': 700, 'maxHeight': 700}))
  }
}

function clearFields(){
  $("#placeAddress").val("")
  $("#autocomplete").val("")
}
