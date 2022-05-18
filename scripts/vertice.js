export class Vertice {
    vertice = ''
    vizinhos = []

    constructor(vertice, vizinhos) {
        this.vertice = vertice
        this.vizinhos = vizinhos
    }

    get vertice() {
        return this.vertice
    }
    get vizinhos() {
        return this.vizinhos
    }

    set vertice(vertice) {
        this.vertice = vertice
    }
    set vizinhos(vizinhos) {
        this.vizinhos = vizinhos
    }
}