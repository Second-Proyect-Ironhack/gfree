function getPlaces(){
  $.ajax ({
    method: "get",
    url : "http://localhost:3000/places",
    dataType : 'json',
  }).then(places => {
    console.log(places)
      show(places)
  }).catch(e => console.log(e))
}

function show(arr){
  arr.forEach(obj =>{
    return new google.maps.Marker({
      title: obj.name,
      map: map,
      position: {
        lat: obj.coordinates.lat,
        lng : obj.coordinates.lng
      }
    })
  })
}

function createOnePlace (place, input,map) {
  return $.post("http://localhost:3000/map",{
    name: $("#placeName").val(),
    address: $("#placeAddress").val(),
      lat : $("#placeLat").val(),
      lng : $("#placeLng").val()
  }).done(function(){
    console.log("HOLA")
  getPlaces(map)
  marker.setMap(map)
})
}
