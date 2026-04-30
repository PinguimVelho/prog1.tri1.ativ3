const containerCadastrar = document.querySelector('.cadastrar');
const inputTarefa = containerCadastrar.querySelector('input');
const btmAdicionar = containerCadastrar.querySelector('button');

const containerTarefas = document.querySelector('.tarefas');
const templateTarefa = containerTarefas.querySelector('template');

function carregarTarefas() {
    const stringTarefas = localStorage.getItem('tarefas');
    const arrayTarefas = JSON.parse(stringTarefas) || [];
    arrayTarefas.forEach(criarTarefa);

}

function salvarTarefa() {
    const nodeListTarefas = containerTarefas.querySelectorAll(":scope > .tarefa span");
    const arrayTarefas = Array.from(nodeListTarefas).map(el => el.textContent);
    const stringTarefas = JSON.stringify(arrayTarefas)
    localStorage.setItem('tarefas', stringTarefas);
}

function criarTarefa(texto) {
    if (texto.trim() === '') return
        const tarefa = templateTarefa.content.cloneNode(true);
        const spanTitle = tarefa.querySelector('span');
        const btmExcluir = tarefa.querySelector('button');
        spanTitle.textContent = texto;
        btmExcluir.addEventListener('click', () => {
            btmExcluir.closest('.tarefa').remove()
            salvarTarefa()
            
        });
        containerTarefas.appendChild(tarefa);
        salvarTarefa()
}

btmAdicionar.addEventListener('click', () => {
    const texto = inputTarefa.value.trim();
    criarTarefa(texto);
    inputTarefa.value = '';
})

inputTarefa.addEventListener('keypress', (event) => {
    if (event.key !== 'Enter') return;
    btmAdicionar.click();
})








carregarTarefas()