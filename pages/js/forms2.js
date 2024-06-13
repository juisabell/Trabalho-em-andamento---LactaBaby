let button2 = document.getElementById("form2-button");
const storedAccount = localStorage.getItem('@contaConectada');
let list = [];

button2.onclick = async function(event) {
  event.preventDefault();

  if (!storedAccount) {
    alert("Nenhuma conta conectada");
  } else {
    const account = JSON.parse(storedAccount);
    let userEmail = account.email;

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

    doencasList.forEach(item => {
      if (item.checkbox.checked) {
        list.push(item.value);
      }
    });

    let outraDoenca = document.getElementById("outra-doenca").value;
    if (outraDoenca) {
      list.push(outraDoenca);
    }

    data = {
      doencasList
    }

    try {
      const response = await fetch('http://localhost:3003/api/store/forms', {
        method: "POST",
        headers: { "Content-type": "application/json;charset=UTF-8" },
        body: JSON.stringify(data)
      });

      let content = await response.json();

      if (content.success) {
        alert(content.message);
        window.location.href = './form3.html'
      } else {
        alert(content.message);
      }
    } catch (error) {
      alert('Falha ao conectar com o servidor.');
    }
  }
}