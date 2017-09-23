
$(".translate").on("click", function(e){
  e.preventDefault()
  const sourceLanguage = $("#source").val()
  const targetLanguage = $("#target").val()
  const itComesFrom = $(".translation")

  $(itComesFrom).each((index)=>{
    const product = itComesFrom[index]
    const title = $(product).children("h5")
    const description = $(product).siblings().children()
    const toTranslate = $(title).text() + " " + $(description).text()
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
  const translated = text.text[0]
  const title = $(element).children("h5")
  const description = $(element).siblings().children()
  const lengthOfTitle = title.text().split(" ").length
  const arrOfTrans = text.text[0].split(" ")
  const textForTitle = arrOfTrans.splice(1,lengthOfTitle)
  console.log(arrOfTrans)
  const textForDes = arrOfTrans.join("   ");
  $(description).text(textForDes.slice(0,textForDes.length-1))
  $(title).text(textForTitle.join(" "))

}

function updateLanguages(lang){
  $("#source option:selected").removeAttr("selected")
  $("#source option[value='"+lang+"']").attr("selected", "selected")
  var text = $("#source option:selected").text()
  $(".source .select-dropdown").val(text)

}
