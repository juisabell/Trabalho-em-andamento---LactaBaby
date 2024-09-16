import { setAccount } from './account.js';

const password = document.querySelector("#password");
const confirmPassword = document.querySelector("#password-confirm");

function validatePassword() {
  if (password.value !== confirmPassword.value) {
    confirmPassword.setCustomValidity("As senhas não coincidem");
  } else {
    confirmPassword.setCustomValidity('');
  }
}

password.onchange = validatePassword;
confirmPassword.onkeyup = validatePassword;

let button = document.getElementById("signup-button");

button.onclick = async function(event) {
  event.preventDefault();
  validatePassword();

  if (password.value !== confirmPassword.value) {
    alert("As senhas não coincidem!");
    return;
  }

  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let passwordValue = document.getElementById("password").value;

  let data = {
    name,
    email,
    password: passwordValue
  };

  try {
    const response = await fetch('http://localhost:3003/api/store/cadastro', {
      method: "POST",
      headers: { "Content-type": "application/json;charset=UTF-8" },
      body: JSON.stringify(data)
    });

    let content = await response.json();

    if (content.success) {
      setAccount(content.data);
      localStorage.setItem('@contaConectada', JSON.stringify(content.data));
      window.location.href = './form.html'
    } else {
      alert(content.message);
    }
  } catch (error) {
    alert('Falha ao conectar com o servidor.');
  }
};