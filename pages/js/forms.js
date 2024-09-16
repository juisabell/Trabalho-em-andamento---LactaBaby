let button1 = document.getElementById("form-button");
const storedAccount = localStorage.getItem('@contaConectada');

button1.onclick = async function(event) {
  event.preventDefault();

  if (!storedAccount) {
    alert("Nenhuma conta conectada");
  } else {
    const account = JSON.parse(storedAccount);
    console.log(account)
    let userEmail = account;

    let age = document.getElementById("age").value;
    let cpf = document.getElementById("cpf").value;
    let natal = document.getElementById("natal").value;
    let cep = document.getElementById("cep").value;

    let data = {
      age,
      cpf,
      natal,
      cep,
      account
    };

    try {
      const response = await fetch('http://localhost:3003/api/store/forms', {
        method: "POST",
        headers: { "Content-type": "application/json;charset=UTF-8" },
        body: JSON.stringify(data)
      });

      let content = await response.json();

      if (content.success) {
        alert(content.message)
        window.location.href = './form2.html'
      } else {
        alert(content.message);
      }
    } catch (error) {
      alert('Falha ao conectar com o servidor.');
    }
  }
}