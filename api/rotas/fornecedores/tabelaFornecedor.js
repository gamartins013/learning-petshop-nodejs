const Modelo = require('./ModeloTabelaFornecedor')
const NaoEncontrado = require('../../erros/NaoEncontrado')

// criacao de funcoes
module.exports = {
    //criar metodo listar
    listar() {
        return Modelo.findAll()
    },
    // criar metodo inserir
    inserir(fornecedor) {
        return Modelo.create(fornecedor)
    },
    // criar metodo de carregar 
    async pegarPorId(id){
        const encontrado = await Modelo.findOne({
            where: {
                id:id
            }
        })

        if (!encontrado){
            throw new NaoEncontrado()
        }

        return encontrado
    },

    //metodo atualizar
    atualizar (id, dadosParaAtualizar){
        return Modelo.update(
            dadosParaAtualizar,
            {
                where: { id: id}
            }
        )
    },

    //metodo remover
    remover(id){
        return Modelo.destroy({
            where: { id: id}
        })
    }
}