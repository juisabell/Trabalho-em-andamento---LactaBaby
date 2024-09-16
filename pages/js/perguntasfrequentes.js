// Seleciona todos os elementos com a classe 'accordion' e os armazena na variável 'accordions'
const accordions = document.querySelectorAll('.accordion');
 
// Adiciona um evento de clique a cada elemento 'accordion'
// for each: um comando que percorre todos os itens de uma lista, ou seja ele executa todos eles aplicando o que eu pedi
accordions.forEach(accordion => {
    accordion.addEventListener('click', () => {
       // Encontra o elemento com a classe 'accordion-body' dentro do 'accordion clicado'
        const body = accordion.querySelector('.accordion-body');
         // Alterna a classe 'active' no elemento 'accordion-body'(conteudo escondido => ele procura na div la do html)
        body.classList.toggle('active');
        //funçao toggle: se a classe active nao tiver ativa ele aciona, e se ja tiver ele remove.
    });
});
 
const voltarButton = document.querySelector("#voltar");

voltarButton.addEventListener('click', () => {
  window.location.href = "./feed.html"
})