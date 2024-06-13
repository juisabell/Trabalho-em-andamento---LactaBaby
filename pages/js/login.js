import { setAccount } from './account.js';

const button = document.querySelector("#login-button");

button.onclick = async function(event) {
  event.preventDefault();

  let email = document.querySelector("#email").value;
  let password = document.querySelector("#password").value;

  let data = { email, password };

  const response = await fetch('http://localhost:3003/api/store/login', {
    method: "POST",
    headers: { "Content-type": "application/json;charset=UTF-8" },
    body: JSON.stringify(data)
  });

  let content = await response.json();

  if (content.success) {
    setAccount(content.data);
    localStorage.setItem('@contaConectada', JSON.stringify(content.data));
    alert(content.message);
    window.location.href = './form.html';
  } else {
    alert(content.message);
  }
}