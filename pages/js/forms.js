let button1 = document.getElementById("form-button");
// Recupera os dados da conta conectada armazenados no localStorage
const storedAccount = localStorage.getItem('@contaConectada');

button1.onclick = async function(event) {
  event.preventDefault();

   // Verifica se há uma conta conectada
  if (!storedAccount) {
    alert("Nenhuma conta conectada");
  } else {
    const account = JSON.parse(storedAccount);
    console.log(account)
    let userEmail = account;

     // Coleta os valores dos campos do formulário
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
       // Envia uma requisição POST para o servidor com os dados do formulário
      const response = await fetch('http://localhost:3003/api/store/forms', {
        method: "POST",
        headers: { "Content-type": "application/json;charset=UTF-8" },
        body: JSON.stringify(data)
      });

      let content = await response.json();

      if (content.success) {
        alert(content.message) / //Se o formulário foi enviado com sucesso, exibe uma mensagem de sucesso e redireciona para outra página
        alert(content.message);
        window.location.href = './form2.html'
      } else {
        alert(content.message);
      }
    } catch (error) {
      alert('Falha ao conectar com o servidor.');
    }
  }
}