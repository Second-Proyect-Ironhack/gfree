$(".delete").on("click", function(e){
  e.preventDefault()
  $(this).parent().hide()

  const updateInfo = {
    id: $(this).parent().attr("data-id"),
    delete: $(this).parent().val()+1,
  };

 $.ajax({
  method: 'POST',
  url: "http://localhost:3000/products",
  data: updateInfo,
  dataType: "json",
}).then(() => {
  }).catch(e => console.log(e))
})
