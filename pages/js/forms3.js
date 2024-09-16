let button = document.getElementById("form2-button");
const storedAccount = localStorage.getItem('@contaConectada');

button.onclick = async function(event) {
  event.preventDefault();

  if (!storedAccount) {
    alert("Nenhuma conta conectada");
  } else {
    const account = JSON.parse(storedAccount);
    let userEmail = account;

    let list = [];

    let substanciasList = [
      { checkbox: document.getElementById("substancia1"), value: "alcool" },
      { checkbox: document.getElementById("substancia2"), value: "drogas" },
      { checkbox: document.getElementById("substancia3"), value: "nicotina" },
      { checkbox: document.getElementById("substancia4"), value: "nenhuma" }
    ];

    substanciasList.forEach(item => {
      if (item.checkbox.checked) {
        list.push(item.value);
      }
    });

    let outraSubstancia = document.getElementById("outra-substancia").value;
    if (outraSubstancia) {
      list.push(outraSubstancia);
    }
    if (list == ""){
      list.push("nenhuma")
    }
    let medicacao = document.getElementById("medicacao").value;
    if (medicacao == ""){
      medicacao = "nenhuma"
    }

    listString2 = String(list)

    data = {
      listString2,
      medicacao,
      userEmail
    }

    try {
      const response = await fetch('http://localhost:3003/api/store/forms3', {
        method: "POST",
        headers: { "Content-type": "application/json;charset=UTF-8" },
        body: JSON.stringify(data)
      });

      let content = await response.json();

      if (content.success) {
        alert(content.message);
        window.location.href = './form-final.html'
      } else {
        alert(content.message);
      }
    } catch (error) {
      alert('Falha ao conectar com o servidor.');
    }
  }
}