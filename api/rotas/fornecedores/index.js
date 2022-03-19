const roteador = require('express').Router()
const TabelaFornecedor = require('./tabelaFornecedor')
const Fornecedor = require('./Fornecedor')


// metodo listar
roteador.get('/', async (requisicao, resposta) => {
    const resultados = await TabelaFornecedor.listar()
    resposta.send(
        JSON.stringify(resultados)
    )
})

// metodo criar
roteador.post('/', async (requisicao, resposta) => {
    const dadosRecebidos = requisicao.body
    const fornecedor = new Fornecedor(dadosRecebidos)
    await fornecedor.criar()
    resposta.send(
        JSON.stringify(fornecedor)
    )
})

module.exports = roteador   