let button = document.getElementById("form2-button");
const storedAccount = localStorage.getItem('@contaConectada');

button.onclick = async function(event) {
  event.preventDefault();

  if (!storedAccount) {
    alert("Nenhuma conta conectada");
  } else {
    const account = JSON.parse(storedAccount);
    let userEmail = account;

    let doencasList = [
      { checkbox: document.getElementById("doenca1"), value: "doenca_de_chagas" },
      { checkbox: document.getElementById("doenca2"), value: "toxoplasmose" },
      { checkbox: document.getElementById("doenca3"), value: "diabetes" },
      { checkbox: document.getElementById("doenca4"), value: "anemia" },
      { checkbox: document.getElementById("doenca5"), value: "has" },
      { checkbox: document.getElementById("doenca6"), value: "sifis" },
      { checkbox: document.getElementById("doenca7"), value: "rubeola" },
      { checkbox: document.getElementById("doenca8"), value: "nenhuma" }
    ];

     // Cria uma lista para armazenar os valores selecionados
    let list = [];

    // Percorre a lista de checkboxes e adiciona os valores dos checkboxes marcados à lista
    doencasList.forEach(item => {
      if (item.checkbox.checked) {
        list.push(item.value);
      }
    });

    let outraDoenca = document.getElementById("outra-doenca").value;
    // Se o campo "outra doença" não estiver vazio, adiciona seu valor à lista
    if (outraDoenca) {
      list.push(outraDoenca);
    }

     // Se a lista estiver vazia, adiciona "nenhuma" à lista
    if (list == ""){
      list.push("nenhuma")
    }

    // Converte a lista em uma string, separada por vírgulas
    listString = String(list)

    // envia p servidor
    data = {
      listString,
      userEmail
    }

    try {
      const response = await fetch('http://localhost:3003/api/store/forms2', {
        method: "POST",
        headers: { "Content-type": "application/json;charset=UTF-8" },
        body: JSON.stringify(data)
      });

      let content = await response.json();

      if (content.success) { // Se o formulário foi enviado com sucesso, redireciona para outra página
        window.location.href = './form3.html'
      } else {
        alert(content.message);
      }
    } catch (error) {
      alert('Falha ao conectar com o servidor.');
    }
  }
}