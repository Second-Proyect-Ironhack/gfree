

$("#love").on("click", function(e){
  e.preventDefault()
  if($("#love i ").text() !== "star"){
  const placeID = {id : $("#love").attr("data-value")}
  addFavorite(placeID)
}
})

function addFavorite(id){
  $.ajax({
    url:`/add/favorite`,
    method: "post",
    dataType: "json",
    data : id
  }).then(()=>{
    $("#love").attr("href", "#")
    $("#love i").text("star")
  })
}
