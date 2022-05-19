import { Aresta } from "./aresta.js"
import { Vizinho } from "./vizinho.js"

export class Grafo {
    vertices=null
    arestas=null
    
    constructor(vertices, arestas){
        this.vertices = vertices
        this.arestas = arestas
    }

    getPos(v) {
        let alfabeto = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
        return alfabeto.indexOf(v)
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

    primMin(raiz) {
        let soma = 0
        let menorA = new Aresta(null, null, 99) // Aresta com o menor peso
        let visitado = false
        let caminhosC = [] // Caminhos conhecidos
        let visitados = [] // Vertices visitados
        let caminho = [] // Arestas passadas
        
        console.log('\n--------------------------- PRIM (MIN) ---------------------------------\n\n')
        
        let nAP = 0 // nAP (Numero de Arestas Percorridas)
        let n = this.vertices.length // Numero de vertices
        let vA = this.vertices[this.getPos(raiz)] // vA (Vertice apontado/atual)
        
        // Enquanto numero de Arestas Percorridas for igual ao numero de vertices-1
        while(nAP < n-1) {
            // Encontra os vertices vizinhos
            if(vA.vizinhos.length == 0)
                this.setVizinhos(vA)
            // console.log('Vertice Atual:\n\t', vA)
            
            // Preenche lista de arestas conhecidas
            vA.vizinhos.forEach(vizinho => {
                caminhosC.push(new Aresta( vA.vertice, vizinho.vertice, vizinho.peso ))
            })
            // console.log('Caminhos Conhecidos:\n\t',caminhosC)

            // Marca como visitado
            visitado = visitados.includes(v => v.vertice == vA.vertice)
            if(!visitado)
                visitados.push(vA)
                
            // Procura a menor aresta para um vertice não visitado
            menorA = new Aresta(null, null, 99)
            caminhosC.forEach(aresta => {
                if(aresta.peso <= menorA.peso){
                    if(visitados.findIndex(v => v.vertice == aresta.v2) == -1)  // -1 => não encontrado
                        menorA = aresta
                }
            })

            caminho.push(menorA)
            soma += parseInt(menorA.peso)
            nAP++
            
            vA = this.vertices[this.getPos(menorA.v2)]
        }
        // Adiciona o ultimo vertice visitado
        visitados.push(vA)
        this.setVizinhos(vA)

        console.log('\n------------------------- PRIM (MIN) -----------------------------\n\n')

        // console.log('VISITADOS => \n\t',visitados)
        // console.log('CAMINHO => \n\t',caminho)
        // console.log('\tSoma:',soma, '\n\tnumArestas:', nAP)

        return [new Grafo(visitados,caminho),soma]
    }



    primMax(raiz) {
        let soma = 0
        let maiorA = new Aresta(null, null, 99) // Aresta com o maior peso
        let visitado = false
        let caminhosC = [] // Caminhos conhecidos
        let visitados = [] // Vertices visitados
        let caminho = [] // Arestas passadas
        
        console.log('\n--------------------------- PRIM (MAX) --------------------------------\n\n')
        
        let nAP = 0 // nAP (Numero de Arestas Percorridas)
        let n = this.vertices.length // Numero de vertices
        let vA = this.vertices[this.getPos(raiz)] // vA (Vertice apontado/atual)
        
        // Enquanto numero de Arestas Percorridas for igual ao numero de vertices-1
        while(nAP < n-1) {
            // Encontra os vertices vizinhos
            if(vA.vizinhos.length == 0)
                this.setVizinhos(vA)
            // console.log('Vertice Atual:\n\t', vA)
            
            // Preenche lista de arestas conhecidas
            vA.vizinhos.forEach(vizinho => {
                caminhosC.push(new Aresta( vA.vertice, vizinho.vertice, vizinho.peso ))
            })
            // console.log('Caminhos Conhecidos:\n\t',caminhosC)

            // Marca como visitado
            visitado = visitados.includes(v => v.vertice == vA.vertice)
            if(!visitado)
                visitados.push(vA)
                
            // Procura a maior aresta para um vertice não visitado
            maiorA = new Aresta(null, null, -1)
            caminhosC.forEach(aresta => {
                if(aresta.peso >= maiorA.peso){
                    if(visitados.findIndex(v => v.vertice == aresta.v2) == -1)  // -1 => não encontrado
                        maiorA = aresta
                }
            })

            caminho.push(maiorA)
            soma += parseInt(maiorA.peso)
            nAP++
            
            vA = this.vertices[this.getPos(maiorA.v2)]
        }
        // Adiciona o ultimo vertice visitado
        visitados.push(vA)
        this.setVizinhos(vA)

        console.log('\n------------------------- FIM PRIM (MAX) -----------------------------\n\n')

        // console.log('VISITADOS => \n\t',visitados)
        // console.log('CAMINHO => \n\t',caminho)
        // console.log('\tSoma:',soma, '\n\tnumArestas:', nAP)

        return [new Grafo(visitados,caminho),soma]
    }

    

}