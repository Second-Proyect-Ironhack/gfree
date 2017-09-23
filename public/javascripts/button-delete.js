$(".delete").on("click", function(e){
  e.preventDefault()
  $(this).parent().parent().hide()

  const updateInfo = {
    id: $(this).parent().parent().attr("data-id"),
    delete: $(this).parent().parent().val()+1,
  };

 $.ajax({
  method: 'POST',
  url: "/products",
  data: updateInfo,
  dataType: "json",
}).then(() => {
  }).catch(e => console.log(e))
})
