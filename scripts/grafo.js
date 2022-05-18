import { Aresta } from "./aresta.js"
import { Vizinho } from "./vizinho.js"

export class Grafo {
    vertices=null
    arestas=null
    
    constructor(vertices, arestas){
        this.vertices = vertices
        this.arestas = arestas
    }

    // Guarda todos os vizinhos para cada vertice (Não usado)
    setAllVizinhos() {
        this.vertices.forEach(vertice => {
            this.arestas.forEach(aresta => {
                if(vertice.vertice == aresta.v1) {
                    vertice.vizinhos.push(new Vizinho(aresta.v2,aresta.peso))
                } else if(vertice.vertice == aresta.v2) {
                    vertice.vizinhos.push(new Vizinho(aresta.v1,aresta.peso))
                }
            })
        })
    }

    // Guarda os vizinhos
    setVizinhos(vA) {
        this.arestas.forEach(aresta => {
            if(vA.vertice == aresta.v1) {
                vA.vizinhos.push(new Vizinho(aresta.v2,aresta.peso))
            } else if(vA.vertice == aresta.v2) {
                vA.vizinhos.push(new Vizinho(aresta.v1,aresta.peso))
            }
        })
    }

    getPos(v) {
        let alfabeto = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
        return alfabeto.indexOf(v)
    }

    
    primMin(raiz) {
        let soma = 0
        let menorA = new Aresta(null, null, 99) // Aresta com o menor peso
        let visitados = []
        let caminhosC = [] // Caminhos conhecidos
        let agm = []
        
        console.log('\n--------------------------- PRIM MIN ---------------------------------\n\n')
        
        let nAP = 0 // nAP (Numero de Arestas Percorridas)
        let n = this.vertices.length // Numero de vertices
        let vA = this.vertices[this.getPos(raiz)] // vA (Vertice apontado/atual)
        
        // Enquanto numero de Arestas Percorridas for igual ao numero de vertices-1
        while(nAP < n-1) {
            // Marca como visitado
            if(!visitados.includes(vA.vertice)){
                visitados.push(vA.vertice)
            }

            // Encontra os vertices vizinhos
            if(vA.vizinhos.length == 0)
                this.setVizinhos(vA)
            // console.log('Vertice Atual:\n\t', vA)

            // Preenche lista de arestas conhecidas
            vA.vizinhos.forEach(vizinho => {
                caminhosC.push(new Aresta( vA.vertice, vizinho.vertice, vizinho.peso ))
            })
            // console.log('Caminhos Conhecidos:\n\t',caminhosC)

            menorA = new Aresta(null, null, 99)
            // Procura a menor aresta para um vertice não visitado
            caminhosC.forEach(aresta => {
                if(aresta.peso <= menorA.peso){
                    if(!visitados.includes(aresta.v2)){
                        menorA = aresta
                        vA = this.vertices[this.getPos(menorA.v2)]
                    }
                }
            })
            
            soma+=menorA.peso
            nAP++
        }
        visitados.push(vA.vertice)

        console.log('\n------------------------- FIM PRIM MIN -----------------------------\n\n')

        console.log('VISITADOS => \n\t',visitados)
        console.log('\tSoma:',soma, '\n\tnumArestas:', nAP)
        // return agm
    }

    primMax(raiz) {
        
    }

}