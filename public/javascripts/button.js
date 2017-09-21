$("#create").on("click", function(e){
  e.preventDefault()
  if($("#placeAddress").val() !== undefined){
  const info = {
    name: $("#placeName").val(),
    address:$("#placeAddress").val(),
    lat: $("#placeLat").val(),
    lng: $("#placeLng").val(),
    picture: $("#placePicture").val()
  }
    $.ajax({
    method: "POST",
    url : "/map",
    data : info,
    dataType: "json"
  }).then(()=> {
    clearFields()
    getPlaces(map)
    marker.setMap(map)
  })
}else{
  alert("Please enter a Place")
}
})
