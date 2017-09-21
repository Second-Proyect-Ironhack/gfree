$("#create").on("click", function(e){
  e.preventDefault()
  if($("#placeAddress").val() !== ""){
  const info = {
    name: $("#placeName").val(),
    address:$("#placeAddress").val(),
    lat: $("#placeLat").val(),
    lng: $("#placeLng").val(),
    picture: $("#placePicture").val(),
    rol : $('input[type=radio]:checked').val()
  }
    $.ajax({
    method: "POST",
    url : "/map",
    data : info,
    dataType: "json"
  }).then(()=> {
    clearFields()
    getPlaces("places")

  })
}else{
  alert("Please enter a Place")
}
})
