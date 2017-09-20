$(".delete").on("click", function(e){
  e.preventDefault()
  $(this).parent().hide()

  const updateInfo = {
    id: $(".value").attr("data-id"),
    delete: $(".value").val()+1,
  };

 $.ajax({
  method: 'POST',
  url: "http://localhost:3000/products",
  data: updateInfo,
  dataType: "json",
}).then(() => {
    console.log('Update SUCCESS!');
    console.log(patchResponse);
  }).catch(e => console.log(e))
})
