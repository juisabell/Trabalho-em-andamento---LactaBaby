const perfilButton = document.querySelector("#perfil")
const hospButton = document.querySelector("#hospital")
const redirect = document.querySelector(".redirect")
const redirect2 = document.querySelector(".redirect2")
const redirect3 = document.querySelector(".redirect3")
const faq = document.querySelector(".faq-section")
const report = document.querySelector(".imagem")
const report2 = document.querySelector(".imagem2")
const report3 = document.querySelector(".imagem3")
const butonchat = document.querySelector(".butonchat")

perfilButton.addEventListener('click', () => {
  window.location.href = "./perfil.html"
})

hospButton.addEventListener('click', () => {
  window.location.href = "./perfilbancodeleite.html"
})

redirect.addEventListener('click', function(){
  window.location.href = "higiene.html"
})
redirect2.addEventListener('click', function(){
  window.location.href = "coleta.html"
})
redirect3.addEventListener('click', function(){
  window.location.href = "armazenar.html"
})

faq.addEventListener('click', function(){
  window.location.href = "perguntasfrequentes.html"
})

report.addEventListener('click', function(){
  window.location.href = "reportagens1.html"
})
report2.addEventListener('click', function(){
  window.location.href = "reportagens2.html"
})
report3.addEventListener('click', function(){
  window.location.href = "reportagem3.html"
})
butonchat.addEventListener('click', function(){
  window.location.href = "chat.html?destino=3"
})