
$(".translate").on("click", function(){
  const toTranslate = $(".translation").text()
  const itComesFrom = $(".translation")
  ajax(toTranslate,"es", "en", itComesFrom)
})




function ajax(textoAtraducir,lang1, lang2, toDraw){
   const texto = textoAtraducir.split(" ").join("+")
   console.log(texto)
  const language = lang1 + "-" + lang2
  $.ajax({
    method:"get",
    url: `https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20140720T191145Z.05605441c6ee16dc.eaaf6c6c8690cb5fb094cea2bfec4f787af6170c&lang=${language}&text=${texto}"&#8221;`,
    dataType: "json",
  }).then((data)=> showText(data,toDraw))
    .catch(e => console.log(e))
}
function showText(text, element){
  $(element).text(text.text[0])
}
