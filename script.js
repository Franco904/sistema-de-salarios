const dados = []

const erro = document.getElementById('erro')
const sucesso = document.getElementById('sucesso')
const btnRelatorio = document.getElementById('relatorio')
const res = document.getElementById('res')

let nome = document.querySelector('input#nome')
let valorHoras = document.querySelector('input#valorHoras')
let qtdHoras = document.querySelector('input#qtdHoras')

function calcular() {
    while (dados.length > 0) {
        dados.pop()
    }

    if (nome.value.length == 0 || valorHoras.value.length == 0 || qtdHoras.value.length == 0) {
        erro.style.display = 'block'
        sucesso.style.display = 'none'
        btnRelatorio.style.display = 'none'
        res.style.display = 'none'
    }
    else {
        dados.push(nome.value, valorHoras.value, qtdHoras.value)
        salarioBruto(dados[1], dados[2])
        
        sucesso.style.display = 'block'
        erro.style.display = 'none'
        btnRelatorio.style.display = 'inline'
    }
}

function salarioBruto(valorHoras, qtdHoras) {
    salBruto = valorHoras * qtdHoras
    dados.push(salBruto)

    impostoRenda(dados[3])
}

function impostoRenda(salBruto) {
    impRenda = 0
    // Obs: Fiz os cálculos com a tabela mensal, pois a anual só se aplica a ajustes, e não a salários.

    if (salBruto < 1903.98) {
        impRenda = 0

    }
    else if (salBruto < 2826.65) {
        impRenda = (salBruto * 0.075) - 142.80

    }
    else if (salBruto < 3751.05) {
        impRenda = (salBruto * 0.15) - 354.80

    }
    else if (salBruto < 4664.68) {
        impRenda = (salBruto * 0.225) - 636.13

    }
    else {
        impRenda = (salBruto * 0.275) - 869.36

    }
    dados.push(impRenda)
    salarioLiquido(dados[3], dados[4])
}

function salarioLiquido(salBruto, impostoRenda) {
    salLiq = salBruto - impostoRenda
    dados.push(salLiq)

}

function mostrarRelatorio() {
    let nomeRes = document.getElementById('nomeRes')
    let valorHorasRes = document.getElementById('valorHorasRes')
    let qtdHorasRes = document.getElementById('qtdHorasRes')
    let impRendaRes = document.getElementById('impostoRendaRes')
    let salBrutoRes = document.getElementById('salBrutoRes')
    let salLiquido = document.getElementById('salLiquidoRes')

    nomeRes.value = dados[0]
    valorHorasRes.value = dados[1]
    qtdHorasRes.value = dados[2]
    salBrutoRes.value = dados[3]
    impRendaRes.value = dados[4].toFixed(2)
    salLiquido.value = dados[5].toFixed(2)

    res.style.display = 'block'
    sucesso.style.display = 'none'
}

function limpar() {
    erro.style.display = 'none'
    sucesso.style.display = 'none'
    btnRelatorio.style.display = 'none'
    res.style.display = 'none'
}
