function getPlaces(){
  $.ajax ({
    method: "get",
    url : "/places",
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
  if(elem.picture !== undefined){
    infowindow.setContent(`<div><h2>${elem.name}</h2><img src="${elem.picture}" width="100"><p>${elem.address}</p><a href="/place/${elem._id}">GO</a></div>`)
}
else{
  infowindow.setContent(`<div><h2>${elem.name}</h2><p>${elem.address}</p><a href="/place/${elem._id}">GO</a></div>`)
}
}
