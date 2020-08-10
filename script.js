const listaRelatorios = []

const erro = document.getElementById('erro')
const sucesso = document.getElementById('sucesso')
const btnRelatorio = document.getElementById('relatorio')
const res = document.getElementById('res')

let nome = document.querySelector('input#nome')
let valorHoras = document.querySelector('input#valorHoras')
let qtdHoras = document.querySelector('input#qtdHoras')

function calcular() {
    let dados = []

    // while (dados.length > 0) {
    //     dados.pop()
    // }

    if (nome.value.length == 0 || valorHoras.value.length == 0 || qtdHoras.value.length == 0) {
        erro.style.display = 'block'
        sucesso.style.display = 'none'
        btnRelatorio.style.display = 'none'
        res.style.display = 'none'
    }
    else {
        dados.push(nome.value, valorHoras.value, qtdHoras.value)
        salarioBruto(dados[1], dados[2], dados)
        
        sucesso.style.display = 'block'
        erro.style.display = 'none'
        btnRelatorio.style.display = 'inline'
    }
}

function salarioBruto(valorHoras, qtdHoras, dados) {
    salBruto = valorHoras * qtdHoras
    dados.push(salBruto)

    impostoRenda(dados[3], dados)
}

function impostoRenda(salBruto, dados) {
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
    salarioLiquido(dados[3], dados[4], dados)
}

function salarioLiquido(salBruto, impostoRenda, dados) {
    salLiq = salBruto - impostoRenda
    dados.push(salLiq)

    listaRelatorios.push(dados)
}

function mostrarRelatorio() {
    let nomeRes = document.getElementById('nomeRes')
    let valorHorasRes = document.getElementById('valorHorasRes')
    let qtdHorasRes = document.getElementById('qtdHorasRes')
    let impRendaRes = document.getElementById('impostoRendaRes')
    let salBrutoRes = document.getElementById('salBrutoRes')
    let salLiquido = document.getElementById('salLiquidoRes')

    nomeRes.value = listaRelatorios[listaRelatorios.length - 1][0]
    valorHorasRes.value = listaRelatorios[listaRelatorios.length - 1][1]
    qtdHorasRes.value = listaRelatorios[listaRelatorios.length - 1][2]
    salBrutoRes.value = listaRelatorios[listaRelatorios.length - 1][3]
    impRendaRes.value = listaRelatorios[listaRelatorios.length - 1][4].toFixed(2)
    salLiquido.value = listaRelatorios[listaRelatorios.length - 1][5].toFixed(2)

    res.style.display = 'block'
    sucesso.style.display = 'none'

    relatorios()
}

console.log('Relatórios:')
function relatorios() {
    let resultado = ''

    const mostrarRel = function(item, index) {
        
        resultado +=  
        ('<strong>=========================</strong><br>') +
        (`Nome pessoal: ${item[0]}<br>`) +
        (`Valor / hora trabalhada: ${item[1]}<br>`) +
        (`Quant. Horas: ${item[2]}<br>`) +
        (`Imposto de renda: ${item[3]}<br>`) +
        (`Salário Bruto: ${item[4].toFixed(2)}<br>`) +
        (`Salário Líquido: ${item[5].toFixed(2)}<br>`) +
        ('<strong>=========================</strong><br>')
    } 

    listaRelatorios.forEach(mostrarRel)
    document.getElementById('info').innerHTML = resultado
}

function limpar() {
    erro.style.display = 'none'
    sucesso.style.display = 'none'
    btnRelatorio.style.display = 'none'
    res.style.display = 'none'
}
