let button2 = document.getElementById("form2-button");
const storedAccount = localStorage.getItem('@contaConectada');
let list = []

button2.onclick = async function(event) {
  event.preventDefault();

  if (!storedAccount) {
    alert("Nenhuma conta conectada");
  } else {
    const account = JSON.parse(storedAccount);
    let userEmail = account.email;

    let doencasList = [    
      doenca1 = document.getElementById("doenca1").value,
      doenca2 = document.getElementById("doenca2").value,
      doenca3 = document.getElementById("doenca3").value,
      doenca4 = document.getElementById("doenca4").value,
      doenca5 = document.getElementById("doenca5").value,
      doenca6 = document.getElementById("doenca6").value,
      doenca7 = document.getElementById("doenca7").value,
      doenca8 = document.getElementById("doenca8").value,
      outraDoenca = document.getElementById("outra-doenca").value,
    ].forEach(doencas => {
      if(doencas.checked == true){
        list.push(doencas)
      }
    })
    console.log(list)

    // try {
    //   const response = await fetch('http://localhost:3003/api/store/forms', {
    //     method: "POST",
    //     headers: { "Content-type": "application/json;charset=UTF-8" },
    //     body: JSON.stringify(data)
    //   });

    //   let content = await response.json();

    //   if (content.success) {
    //     alert(content.message);
    //     window.location.href = './form3.html'
    //   } else {
    //     alert(content.message);
    //   }
    // } catch (error) {
    //   alert('Falha ao conectar com o servidor.');
    // }
  }
}