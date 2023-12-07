const CONFIRMAR = document.getElementById("Confirmar");
const CONFIRMAREX = document.getElementById("ConfirmarEx");
const Add = document.getElementById("ConfrimarAdd");
const carrosel = document.getElementById("CarroselI")
let TituloAntigo;
let ID;




//==================GET=================
axios.get('http://127.0.0.1:5000/').then((response) => {
    getData(response.data)
})
    .catch(function (error) {
        console.log(error)
    })

function getData(data) {
    data.map((item) => {
        carrosel.innerHTML += `
        <div class="carousel-item">
        <div class="caixa-texto rounded mx-auto d-block">
            <h1 class="abcc">${item.TITULO}</h1>
            <p class="espacinho">${item.TEXTO}</p>
            <div>
                <p class="text-end"><span onclick="editar('${item.TITULO}')" type="button" class="material-symbols-outlined text-success"data-bs-toggle="modal" data-bs-target="#exampleModal1">
                    edit
                    </span>
                    <span onclick="excluir(${item.ID})" type="button" class="material-symbols-outlined text-danger" data-bs-toggle="modal"
                        data-bs-target="#exampleModal2">
                        delete
                    </span>
                </p>
            </div>
        </div>
    </div>
            `
    })
}

//==================DELETE=================
function excluir(id){
    ID = id
}

CONFIRMAREX.addEventListener('click', ()=>{

    const dicio = {"ID": ID}
    
    axios.delete(`http://127.0.0.1:5000/delete`, {data:dicio}).then((response) => {
        console.log("Excluido com sucesso", response.data)
    })
    .catch(function (error) {
        console.error("Houve um erro na hora de excluir",error)
    })
})

//==================PUT=======================
function editar(titulo){
    TituloAntigo = titulo
}

CONFIRMAR.addEventListener('click', ()=>{
    let TituloNovo = document.getElementById("NovoTitulo").value
    let TextoNovo = document.getElementById("NovoTexto").value

    const json = {
        "TITULOANTIGO" : TituloAntigo,
        "TITULONOVO" : TituloNovo,
        "TEXTONOVO" : TextoNovo
    }

    axios.put(`http://127.0.0.1:5000/update`, json).then((response) => {
        console.log("Atualizado com sucesso", response.data)
    })
    .catch(function (error) {
        console.error("Houve um erro na hora de atualizar",error)
    })
    
})

//==============POST===============

function adicionar(){
    const titulo = document.getElementById("TITUlO").value
    const texto = document.getElementById("TEXTO").value
    if (titulo.trim() !== "" && texto.trim() !== "" ){
        const json = {
            "TITULO" : titulo,
            "TEXTO" : texto
        }
        console.log(json)
        axios.post(`http://127.0.0.1:5000/add`, json).then((response) => {
            console.log("Tarefa adicionada com sucesso", response.data)
        })
        .catch(function (error) {
            console.error("Houve um erro na hora de acionar",error)
        })

    
    }
}

//////////////////////////////////////////////////////////////

