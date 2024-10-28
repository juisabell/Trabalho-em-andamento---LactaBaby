// buscar os dados dos pacientes e exibir as informações corretamente.

// Variável para armazenar os dados dos pacientes
let dataUser = Object;


// Função para mostrar as informações de um paciente específico quando clicado
function informacoes(id) {  
  let cards = document.getElementById('listCards');
  console.log(dataUser);
  dataUser.map(user => {  // Percorre todos os usuários
    if (user.id === id) {// Verifica se o ID do usuário corresponde ao ID passado
      cards.style.display = 'none';
      popup.style.display = 'flex' // mostra os detalhes
      document.querySelector("#nome").textContent = user.nome
      document.querySelector("#idade").textContent = user.idade
      document.querySelector("#doencas").textContent = user.doencas
      document.querySelector("#subs").textContent = user.substancias
      document.querySelector("#meds").textContent = user.medicacao

      document.querySelector("#close").addEventListener('click', function () {
        popup.style.display = 'none'
        cards.style.display = 'flex'
      })
    }
  })
}

document.addEventListener('DOMContentLoaded', async (event) => {
  event.preventDefault();

  // Faz uma requisição para obter os dados dos pacientes
  const response = await fetch('http://localhost:3003/api/store/pacientes', {
    method: "GET",  // Método GET para obter dados
    headers: { "Content-type": "application/json;charset=UTF-8" },
  });

  let content = await response.json();

  if (content.success) {
    let users = content.data; // Obtém os dados dos pacientes
    dataUser = users;
    users.forEach(user => {
      // console.log(user);
      let mainHtml = document.getElementById('listCards'); // Obtém o elemento onde os cartões serão adicionados
      
        // Cria o HTML para um cartão de paciente
      let card = `<section class='container-3'>
        <div>
          <h1 id='nome3'> ${user.nome} </h1>
          <h2 id='idade3'>${user.idade} anos</h2>
        </div>        
        <p id='plus'>
          
          <input type="button" onclick="informacoes(${user.id})" value="+">
        </p>
        <button class='botaochat' id='btnOpenChat' onclick='openChat(${user.id})'>Entrar em contato</button>
        </section> `

      mainHtml.innerHTML += card;

    });

   

    localStorage.setItem('@pacientes', JSON.stringify(content.data));

    
  } else {
    alert(content.message);
  }
});

const popup = document.querySelector(".popup")

// Função para abrir a página de chat
document.addEventListener('DOMContentLoaded', () => {
  const botaoChat = document.getElementById('btnOpenChat');
});

function openChat(idUsuario) {
  console.log(idUsuario);

  window.location.href = `./chat.html?destino=${idUsuario}`

  
}
