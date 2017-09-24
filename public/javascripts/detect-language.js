$(document).ready(function(){
  pickWord()
})

function pickWord(){
  const firstProduct = $(".translation")[0]
  const wordToCheck = $(firstProduct).children("h5").text()
  detect(wordToCheck)
}

function detect(word){
  $.ajax({
    url:`https://translate.yandex.net/api/v1.5/tr.json/detect?key=trnsl.1.1.20170921T144345Z.c534b7b5e71ad754.6c52aeebbd7f50cdccda5c09e8b9e59fe00aff40&text=${word}`,
    method: "get",
    dataType: "json"
  }).then((data)=>{
    updateLanguages(data.lang)
    console.log(data.lang)})
    .catch(e =>console.log(e))
}
