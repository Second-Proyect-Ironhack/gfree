$(document).ready(function(){
   $(".button-collapse").sideNav();
  $('#show-form').on("click",function(){
    $("#postForm").toggleClass("scale-in")
    moveButtom()
  })
})

function moveButtom(){
    if($(window).width()<700){
      $("#show-form").toggleClass("slide")
    }
}
