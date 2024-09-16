const storedAccount = localStorage.getItem('@contaConectada');
// Obtém a conta armazenada no localStorage com a chave '@contaConectada'
// julia pq o @? pq é usado para identificar funçoes especificas e mais organizado

if (storedAccount) {
  const account = JSON.parse(storedAccount);
    // Atualiza os elementos HTML com os dados da conta
  document.querySelector("#nome").textContent = account.nome;
  document.querySelector("#idade").textContent = account.idade;
  document.querySelector("#doencas").textContent = account.doencas;
  document.querySelector("#subs").textContent = account.substancias;
  document.querySelector("#meds").textContent = account.medicacao;
} else {
  console.error('Nenhuma conta está logada.');
}

const voltarButton = document.querySelector("#voltar");

voltarButton.addEventListener('click', () => {
  window.location.href = "./feed.html"
})