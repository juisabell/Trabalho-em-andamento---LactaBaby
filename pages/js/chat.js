
// chat elements
const chat = document.querySelector(".chat")
const chatForm = chat.querySelector(".chat__form")
const chatInput = chat.querySelector(".chat__input")
const chatMessages = chat.querySelector(".chat__messages")

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

    let message = ""
    if(userId == user.id && idDestino == destino) {
        message = createMessageSelfElement(content)
    }

    if(idDestino == user.id && destino == userId) {
        message = createMessageOtherElement(content, userName, userColor)
    }

    chatMessages.appendChild(message)

    scrollScreen()
}

document.addEventListener('DOMContentLoaded', () => {
    
    

        console.log('handleLogin foi chamado');

        user.id = crypto.randomUUID();

        // Pegar os dados da conta conectada do localStorage
        const contaConectada = JSON.parse(localStorage.getItem('@contaConectada'));
        const contaBLHConectada = JSON.parse(localStorage.getItem('@contaBLHConectada'));

        // Verificar se existe conta BLH conectada, se sim, pegar o id da conta BLH
        if (contaBLHConectada) {
            user.id = contaBLHConectada.id;
            console.log('Conta BLH conectada:', contaBLHConectada);
        } 
        // Se não, verificar se existe uma conta normal conectada e pegar o id da conta normal
        else if (contaConectada) {
            user.id = contaConectada.id;
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
    
    // button.addEventListener('click', handleLogin);
});



const sendMessage = (event) => {
    event.preventDefault()
    
    const message = {
        userId: user.id,
        userName: user.name,
        userColor: user.color,
        content: chatInput.value,
        idDestino: Number(destino)
    }
    // console.log(message + " tes");
    console.log(message)
    websocket.send(JSON.stringify(message))

    chatInput.value = ""
}

chatForm.addEventListener("submit", sendMessage)








