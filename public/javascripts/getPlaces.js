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

function createOnePlace (place, input, map, marker) {
  return $.post("http://localhost:3000/add/place").done(function(){
  getPlaces(map)
  marker.setMap(map)
})
}
