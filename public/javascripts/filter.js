$("#filterPlace").on("click", function(e){
  e.preventDefault()
  clearMarkers()
  const inputs = $('input[type="checkbox"]:checked')
  console.log(inputs.val())
  if(inputs.length == 2){
    getPlaces("places")
  }else if(inputs.val() == "Restaurant"){
    getPlaces("restaurants")
  }else if(inputs.val()=="Shop"){
    getPlaces("shop")
  }
})

function clearMarkers(){
  markers.forEach((marker)=>marker.f.setMap(null))
}
