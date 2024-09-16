import { setAccount } from './account.js';

const button = document.querySelector("#login-button");

button.onclick = async function(event) {
  //// Impede que o formulário recarregue a página quando o botão for clicado
  event.preventDefault();

  //// Pega os valores digitados pelo usuário nos campos "unit" e "password"
  let unit = document.querySelector("#unit").value;
  let password = document.querySelector("#password").value;

  // // Cria um objeto com os dados que vamos enviar para o servidor
  let data = { unit, password };

  // Envia os dados para o servidor
  const response = await fetch('http://localhost:3003/api/store/loginBLH', {
    method: "POST",
    headers: { "Content-type": "application/json;charset=UTF-8" },
    body: JSON.stringify(data)
  });

  // reposta
  let content = await response.json();

  if (content.success) {
     // Se o login foi bem-sucedido, atualiza as informações da conta do usuário
    setAccount(content.data);
    localStorage.removeItem('@contaConectada')

     // Salva os dados da nova conta conectada no armazenamento local
    localStorage.setItem('@contaBLHConectada', JSON.stringify(content.data));
    alert(content.message);

    // Muda para a página "pacientes.html"
    window.location.href = './pacientes.html';
  } else {
    alert(content.message);
  }
}