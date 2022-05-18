
import { Vertice } from './vertice.js'
import { Aresta } from './aresta.js'
import { Grafo } from './grafo.js'

var vertices = [ new Vertice('a',[]), new Vertice('b',[]), new Vertice('c',[]), new Vertice('d',[]),new Vertice('e',[]), new Vertice('f',[]), new Vertice('g',[]), new Vertice('h',[]), new Vertice('i',[]), new Vertice('j',[]), new Vertice('k',[]), new Vertice('l',[]) ]
var arestas = [ new Aresta('a','b',16), new Aresta('a','c',10), new Aresta('a','j',12), new Aresta('b','c',7), new Aresta('b','d',13), new Aresta('b','e',2), new Aresta('c','e',1), new Aresta('c','g',21), new Aresta('d','g',15), new Aresta('e','f',9), new Aresta('e','k',4), new Aresta('f','g',3), new Aresta('f','h',20), new Aresta('f','k',8), new Aresta('g','h',18), new Aresta('g','i',17), new Aresta('h','j',19), new Aresta('i','j',5), new Aresta('i','k',6), new Aresta('i','l',14), new Aresta('k','l',11) ]
const grafo = new Grafo(vertices, arestas)

//inputs
var raiz = 'd'
var m = 'max'

let agm = []
if(m=='min')
    agm = grafo.primMax(raiz)
else 
    agm = grafo.primMin(raiz)

// console.log('RAIZ =>\n\t',raiz)
// console.log('GRAFO =>\n\t',grafo)
// console.log('----------------------------------\nAGM =>\n\t',agm)