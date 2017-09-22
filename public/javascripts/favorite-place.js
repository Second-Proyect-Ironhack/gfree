

$("#love").on("click", function(e){
  e.preventDefault()
  const placeID = {id : $("#love").attr("data-value")}
  addFavorite(placeID)
})

function addFavorite(id){
  $.ajax({
    url:`/add/favorite`,
    method: "post",
    dataType: "json",
    data : id
  })
}
