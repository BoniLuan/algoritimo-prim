import { Vertice } from './vertice.js'
import { Aresta } from './aresta.js'
import { Grafo } from './grafo.js'

var $qtdV = 0
var $vertices = []
var $arestas = []

$('#btnAvancar').click( () =>{
    let form = $('#form-vertices')
    form.addClass('oculto')
    
    let formArestas = $('#form-arestas')
    formArestas.removeClass('oculto')
    $qtdV = $('#qtdV').val()
})

$('#addAresta').click( () =>{
    let aresta = $('#iArestas')
    let lV = $('#lV')
    lV.append(`(${aresta.val()}),`)
    $arestas.push(aresta.val())
    aresta.val('')
})

$('#btnAvancar2').click( () => {
    let form = $('#form-arestas')
    form.addClass('oculto')

    let matriz = $('.matriz')
    matriz.removeClass('oculto')

    let div = $('#div-agm')
    div.removeClass('oculto')

    geraMA()
})


$('#min').click( () => {
    init( $('#raiz').val(), 'MIN' )
})

$('#max').click( () => {
    init($('#raiz').val(), 'MAX')
})

function geraMA() {
    let alfabeto = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
    
    let tbody = $('#tbody')
    let trH = $('#trH')
    let achou = ''
    let tr = ''
    let td = ''
    
    // Vertices de Destino
    let th = document.createElement('th')
    th.append('MA')
    trH.append(th)
    for(let i=0; i<$qtdV; i++) {
        th = document.createElement('th')
        th.append(alfabeto[i])
        trH.append(th)
        $vertices.push(alfabeto[i])
    }
    
    formatarArestas()
    // console.log($vertices)
    // console.log($arestas)
    
  
    for(let i=0; i<$qtdV; i++) { //linha
        td = document.createElement('td'); td = $(td)
        td.html(alfabeto[i])
        tr = document.createElement('tr'); tr = $(tr)
        tr.append(td)
        for(let j=0; j<$qtdV; j++) { // coluna
            td = document.createElement('td')
            td = $(td)
            $arestas.forEach(a => {
                if(a[0] == alfabeto[i] && a[1] == alfabeto[j]) {
                    td.html(a[2])
                    achou = a[2]
                }
                else {
                    td.html(0)
                } 
            })
            if(achou != '')
                tr.append(td.html(achou))
            else
                tr.append(td)
            achou = ''
        }
        tbody.append(tr)
    }
    
}

function formatarArestas() {
    let list = []
    let aux = []
    $arestas.forEach(aresta => {
        aux = aresta.split('-')
        list.push(aux)
        aux=[aux[1],aux[0],aux[2]]
        list.push(aux)
    })

    $arestas = list
}

function formatarArestasPrim() { 
    let j = 1;
    for(let i=0; i<$arestas.length; i++) {
        $arestas.splice(j,1)
        j++
    }
}

function init(raiz, m) {
    var vertices = []
    var arestas = []
    var agm = null

    formatarArestasPrim()

    $vertices.forEach(v => {
        vertices.push(new Vertice(v,[]))
    });

    $arestas.forEach(a => {
        arestas.push(new Aresta(a[0],a[1],parseInt(a[2])))
    });
    console.log(arestas)
    // Exercicio Slide =>
    // var vertices = [ new Vertice('a',[]), new Vertice('b',[]), new Vertice('c',[]), new Vertice('d',[]),new Vertice('e',[]), new Vertice('f',[]), new Vertice('g',[]), new Vertice('h',[]), new Vertice('i',[]), new Vertice('j',[]), new Vertice('k',[]), new Vertice('l',[]) ]
    // var arestas = [ new Aresta('a','b',16), new Aresta('a','c',10), new Aresta('a','j',12), new Aresta('b','c',7), new Aresta('b','d',13), new Aresta('b','e',2), new Aresta('c','e',1), new Aresta('c','g',21), new Aresta('d','g',15), new Aresta('e','f',9), new Aresta('e','k',4), new Aresta('f','g',3), new Aresta('f','h',20), new Aresta('f','k',8), new Aresta('g','h',18), new Aresta('g','i',17), new Aresta('h','j',19), new Aresta('i','j',5), new Aresta('i','k',6), new Aresta('i','l',14), new Aresta('k','l',11) ]
    
    // teste
    // var vertices = [ new Vertice('a',[]), new Vertice('b',[]),new Vertice('c',[]),new Vertice('d',[])]
    // var arestas = [new Aresta('a','b',10), new Aresta('b','c',4),new Aresta('c','d',2),new Aresta('a','d',24),new Aresta('c','a',5)]
    
    var grafo = new Grafo(vertices, arestas)
    if(m == 'MIN')
        agm = grafo.primMin(raiz)
    else
        agm = grafo.primMax(raiz)

    showAgm(grafo, agm)
}

//TELA
function showAgm(grafo, agm) {
    let caminho = $('#caminho')
    let divC = $('#div-caminho')
    let p =''
    let custo = $('#custo')

    caminho.html('Caminho:')
    
    agm[0].arestas.forEach(aresta => {
        p = document.createElement('p')
        p = $(p)
        p.html(`(${aresta.v1}-${aresta.v2}-${aresta.peso}),`)
        divC.append(p)
    });
    
    custo.html("Custo: "+agm[1])

    // agm[0].vertices.forEach(vertice => {
    //     div.append(vertice)
    // });

    console.log('GRAFO =>\n\t',grafo)
    console.log('----------------------------------\nAGM =>\n\t',agm)
}