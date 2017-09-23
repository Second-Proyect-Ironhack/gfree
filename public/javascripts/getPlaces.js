function getPlaces(url){
  $.ajax ({
    method: "get",
    url : `/${url}`,
    dataType : 'json',
  }).then(places =>   {
      show(places)
  }).catch(e => console.log(e))
}

function show(arr){

  arr.forEach(obj =>{
    markers.push(new google.maps.Marker({
      title: obj.name,
      map: map,
      position: {
        lat: obj.coordinates.lat,
        lng : obj.coordinates.lng
      }
    }).addListener("click", function(){
      setInfoWindowContent(obj)
      infowindow.open(map, this)
    }))



    infowindow.close(map, this)
  }

)
}



function setInfoWindowContent(elem){
  let content = ""
  if(elem.picture !== ""){
     content = `<div style="background-image:url(${elem.picture})" class="picture-info"></div>
    <div class="content"><h5 class="info-title">${elem.name}</h5><h6>${elem.address}</h6><div class="favorites">${elem.favorite.length}</div><div class="btnGo"><a href="/place/${elem._id}" class="toplace">GO</a></div></div>"`
}
else{
   content = `<div style="background-image:url(http://www.bcnrestaurantes.com/img/slider/004.jpg)" class="picture-info"></div>
  <div class="content"><h5 class="info-title">${elem.name}</h5><h6>${elem.address}</h6><div class="favorites">${elem.favorite.length}</div><div class="btnGo"><a href="/place/${elem._id}" class="toplace">GO</a></div></div>"`
}
infowindow.setContent(content)
}
