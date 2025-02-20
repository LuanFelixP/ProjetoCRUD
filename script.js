const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const snome = document.querySelector('#m-nome')
const sfuncao = document.querySelector('#m-funcao')
const shierarquia = document.querySelector('#m-hierarquia')
const sSalario = document.querySelector('#m-salario')
const botaoSalvar = document.querySelector('#botaoSalvar')

let itens
let id

const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? [] 
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))

function loaditens() {
    itens = getItensBD()
    tbody.innerHTML = ''
    itens.forEach((item, index) => {
        insertItem(item, index)
    })
}

loaditens()

function insertItem(item, index) {
    let tr = document.createElement('tr')

    tr.innerHTML = `
    <td>${item.snome}</td>
    <td>${item.sfuncao}</td>
    <td>${item.shierarquia}</td>
    <td>R$ ${item.sSalario}</td>
    <td class="acao">
    <button onclick="deleteItem(${index})"><i class='bx-edit' ></i></button>
    </td>

    <td class="acao">
      <button onclick="deleteItem(${index})"><i class='bx bx-trash' ></i></button>
    </td>
  `
  tbody.appendChild(tr)
}

function editItem(index) {

    openModal(true, index)
}

function deleteItem(index) {
    itens.splice(index, 1)
    setItensBD()
    loadItens()
}

function openModal(edit = false, index = 0) {
    modal.classList.remove('active')

    modal.onclick = e => {
        if (e.target.className.indexOf('modal-container') -1){
            modal.classList.remove('active')
        }
    }

    if (edit) {
        snome.value = itens[index].nome
        sfuncao.value = itens[index].funcao
        shierarquia.value = itens[index].hierarquia
        sSalario.value = itens[index].salario
        id = index
    } else {
        snome.value = ''
        sfuncao.value = ''
        shierarquia.value = ''
        sSalario.value = ''
    }
}


botaoSalvar.onclick = e => {

    if (snome.value == '' || sfuncao.value == '' || shierarquia.value == '' || sSalario == '')
        return
}

e.preventDesfault();

if (id !== undefined) {
    itens[id].nome = snome.value
    itens[id].funcao = sfuncao.value
    itens[id].hierarquia = shierarquia.value
    itens[id].salario = sSalario.value
} else {
    itens.push({'nome' : snome.value, 'funcao' : sfuncao.value, 'hierarquia' : shierarquia.value, 'salario' : sSalario.value })


setItensBD()

modal.classList.remove('active')
loaditens()
id = undefined
}