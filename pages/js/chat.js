
// chat elements
const chat = document.querySelector(".chat")
const chatForm = chat.querySelector(".chat__form")
const chatInput = chat.querySelector(".chat__input")
const chatMessages = chat.querySelector(".chat__messages")
let tipoUser = ''
const colors = [
    "cadetblue",
    "darkgoldenrod",
    "cornflowerblue",
    "darkkhaki",
    "hotpink",
    "gold"
]

const user = { id: "", name: "", color: "" }

const urlParams = new URLSearchParams(window.location.search);
const destino = urlParams.get('destino');

console.log(destino)


const createMessageSelfElement = (content) => {
    const div = document.createElement("div")

    div.classList.add("message--self")
    div.innerHTML = content

    return div
}

const createMessageOtherElement = (content, sender, senderColor) => {
    const div = document.createElement("div")
    const span = document.createElement("span")

    div.classList.add("message--other")

    span.classList.add("message--sender")
    span.style.color = senderColor

    div.appendChild(span)

    span.innerHTML = sender
    div.innerHTML += content

    return div
}

const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * colors.length)
    return colors[randomIndex]
}

const scrollScreen = () => {
    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth"
    })
}

const processMessage = ({ data }) => {
    const { userId, userName, userColor, content, idDestino } = JSON.parse(data)

    console.log('to aqui!', user.id)

    let message = ""
    if(userId == user.id && idDestino == destino) {
        console.log("primero if")
        message = createMessageSelfElement(content)
    }

    if(idDestino == user.id && destino == userId) {
        console.log("segundo if")
        message = createMessageOtherElement(content, userName, userColor)
    }

    

    chatMessages.appendChild(message)

    scrollScreen()
}

document.addEventListener('DOMContentLoaded', () => {
    
    
        localStorage.setItem("userId", user.id)
        console.log('handleLogin foi chamado');

        user.id = crypto.randomUUID();

        // Pegar os dados da conta conectada do localStorage
        const contaConectada = JSON.parse(localStorage.getItem('@contaConectada'));
        const contaBLHConectada = JSON.parse(localStorage.getItem('@contaBLHConectada'));

        // Verificar se existe conta BLH conectada, se sim, pegar o id da conta BLH
        if (contaBLHConectada) {
            user.id = contaBLHConectada.id;
            tipoUser = 'BLH'
            console.log('Conta BLH conectada:', contaBLHConectada);
        } 
        // Se não, verificar se existe uma conta normal conectada e pegar o id da conta normal
        else if (contaConectada) {
            user.id = contaConectada.id;
            tipoUser = 'normal'
            console.log('Conta normal conectada:', contaConectada);
        } else {
            console.log('Nenhuma conta conectada encontrada.');
        }

        // user.name = loginInput.value;
        user.color = getRandomColor();

        chat.style.display = "flex";

        websocket = new WebSocket("ws://localhost:3004");
        websocket.onmessage = processMessage;

        console.log('WebSocket criado e interface do chat exibida');
        getMessage(user.id);
    // button.addEventListener('click', handleLogin);
});

async function getMessage(userId){
    console.log("Entrou aqui")
    
    try {
        const response = await fetch(`http://localhost:3003/api/chat/${userId}/${destino}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        let content = await response.json();

        console.log(content)
        
        for (const msg of content) {
            msgAntiga = document.createElement("div");
            console.log("mensagem", msg)
            console.log(tipoUser)

            if(tipoUser == 'normal') {
                if(msg.enviado == 2) {
                    msgAntiga.classList.add('message--self')
                } else {
                    msgAntiga.classList.add('message--other')
                }
            } else {
                if(msg.enviado == 1) {
                    msgAntiga.classList.add('message--self')
                } else {
                    msgAntiga.classList.add('message--other')
                }
            }
            let chat = document.getElementById("chat");
            msgAntiga.innerHTML += msg.msg;
            chat.appendChild(msgAntiga)
        }
      
        
        
    } catch (error) {
        console.error('Erro na requisição:', error);
    }    

}


const sendMessage = async (event) => {
    event.preventDefault();
    
    const message = {
        userId: user.id,
        userName: user.name,
        userColor: user.color,
        content: chatInput.value,
        idDestino: Number(destino), 
        tipoUser: tipoUser
    };
    websocket.send(JSON.stringify(message))
    try {
        const response = await fetch('http://localhost:3003/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(message),
        });

        if (response.ok) {
            console.log('Mensagem enviada com sucesso!');
        } else {
            console.error('Erro ao enviar mensagem.');
        }
    } catch (error) {
        console.error('Erro na requisição:', error);
    }

    chatInput.value = '';
};



chatForm.addEventListener("submit", sendMessage)

// Seleciona o elemento com o ID "voltar" na página HTML
const voltarButton = document.querySelector("#voltar");

// Adiciona um ouvinte de eventos para o clique no botão selecionado
voltarButton.addEventListener('click', () => {
  // Pegar os dados da conta conectada do localStorage
  const contaConectada = JSON.parse(localStorage.getItem('@contaConectada'));
  const contaBLHConectada = JSON.parse(localStorage.getItem('@contaBLHConectada'));

  // Verificar qual conta está conectada e redirecionar para a página apropriada
  if (contaBLHConectada) {
    // Se uma conta BLH estiver conectada, redireciona para a página específica para BLHs
    window.location.href = "./pacientes.html"; // Substitua pelo URL correto para a conta BLH
  } else if (contaConectada) {
    // Se uma conta normal estiver conectada, redireciona para a página dos pacientes
    window.location.href = "./feed.html"; // Substitua pelo URL correto para os pacientes
  } else {
    console.log('Nenhuma conta conectada encontrada.');
  }
});


