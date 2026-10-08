let tarefas = [];

function buscarTarefas() {
    try {

        let usuario = JSON.parse(sessionStorage.getItem("usuario")) || null;
        
        if(!usuario) {
            window.location.href = "index.html"
        }

        fetch(`https://js-lista-de-tarefas-api.onrender.com/tarefas/${usuario.id}`)
        .then(resposta => resposta.json())
        .then(json => {
            if(json.tipo == "error"){
                throw json.mensagem;
            }
            tarefas = json;
            carregarTarefas(tarefas);

        })
    } catch (error) {
        console.log("Error: ", error.message);
        
    }

}

buscarTarefas();

function carregarTarefas(listaTarefas){
    let grid = document.querySelector("#tarefas");

    if (listaTarefas.length == 0) {
        grid.innerHTML = "<p>Crie sua primeira tarefa</p>";
    }
}

function abrirFormCriar(){
    let overlay = document.querySelector("#overlay");
    let formCriar = document.querySelector("#form-criar");
    overlay.classList.remove("opacity-0", "invisible");
    formCriar.classList.remove("opacity-0", "invisible");
}

function fecharFormCriar(){
    let overlay = document.querySelector("#overlay");
    let formCriar = document.querySelector("#form-criar");
    overlay.classList.add("opacity-0", "invisible");
    formCriar.classList.add("opacity-0", "invisible");
}

function criarTarefa(){
    event.preventDefault();
    try {
        let usuario = JSON.parse(sessionStorage.getItem("usuario")) || null;
        let titulo = document.querySelector("#titulo");
        let descricao = document.querySelector("#descricao");
        let dados = {
            titulo: titulo.value,
            descricao: descricao.value,
            usuario_id: usuario.id
        }

         fetch(`https://js-lista-de-tarefas-api.onrender.com/tarefas`,{
            method: "post",
            headers {
                "Content-type": "application/json"
            },
            body: JSON.stringify(dados)
        })
        .then (resposta -> resposta.json())
        .then (json => {
            alert(json.mensagem);
        })

    } catch (error) {
        alert("Error: ", error.message)
    }


}