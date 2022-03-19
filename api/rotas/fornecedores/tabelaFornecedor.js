const Modelo = require('./ModeloTabelaFornecedor')

// criacao de funcoes
module.exports = {
    //criar metodo listar
    listar() {
        return Modelo.findAll()
    },
    // criar metodo inserir
    inserir(fornecedor) {
        return Modelo.create(fornecedor)
    }
}