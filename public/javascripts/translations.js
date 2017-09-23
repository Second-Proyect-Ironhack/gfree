
$(".translate").on("click", function(e){
  e.preventDefault()
  const sourceLanguage = $("#source").val()
  const targetLanguage = $("#target").val()
  const itComesFrom = $(".translation")

  $(itComesFrom).each((index)=>{
    const product = itComesFrom[index]
    const toTranslate = $(product).text()

    translateProduct(toTranslate,sourceLanguage, targetLanguage, product)

  })
  })


function translateProduct(textoAtraducir,lang1, lang2, toDraw){
   const texto = textoAtraducir.split(" ").join("+")
  const language = lang1 + "-" + lang2
  $.ajax({
    method:"get",
    url: `https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20170921T144345Z.c534b7b5e71ad754.6c52aeebbd7f50cdccda5c09e8b9e59fe00aff40&lang=${language}&text=${texto}"&#8221;`,
    dataType: "json",
  }).then((data)=> {
    showText(data,toDraw)
    updateLanguages(lang2)
  })
    .catch(e => console.log(e))
}
function showText(text, element){
  console.log(text.text[0])
  const title = $(element).children("h5")
  const description = $("#probando").siblings(".collapsible-body").children("span")
  const wordsInTittle = title.length
  const arrayOfTrans = text.text[0].split(" ")
  arrayOfTrans.pop()
  const textForTittle = arrayOfTrans.splice(1,wordsInTittle)
  $(title).text(textForTittle[0])
  $(description).text(arrayOfTrans.join(" "))
}

function updateLanguages(lang){
  $("#source option:selected").removeAttr("selected")
  $("#source option[value='"+lang+"']").attr("selected", "selected")

}
