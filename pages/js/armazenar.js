// Seleciona o elemento com o ID "voltar" na página HTML
const voltarButton = document.querySelector("#voltar");

// Adiciona um ouvinte de eventos para o clique no botão selecionado
voltarButton.addEventListener('click', () => {
  // Quando o botão for clicado, redireciona o usuário para a página "feed.html"
  window.location.href = "./feed.html"
})