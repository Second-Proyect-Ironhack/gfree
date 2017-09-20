function getPlaces(){
  $.ajax ({
    method: "get",
    url : "http://localhost:3000/places",
    dataType : 'json',
  }).then(places =>   {
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
    }).addListener("click", function(){
      setInfoWindowContent(obj)
      infowindow.open(map, this)
    })

    infowindow.close(map, this)
  }

)
}
function setInfoWindowContent(elem){
    infowindow.setContent(`<div><h2>${elem.name}</h2><img src=${elem.picture}<p>${elem.address}</p><a href="/place/${elem._id}">GO</a></div>`)
}
