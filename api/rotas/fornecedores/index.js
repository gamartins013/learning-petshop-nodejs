const roteador = require('express').Router()
const TabelaFornecedor = require('./tabelaFornecedor')
const Fornecedor = require('./Fornecedor')
const NaoEncontrado = require('../../erros/NaoEncontrado')



// metodo listar
roteador.get('/', async (requisicao, resposta) => {
    const resultados = await TabelaFornecedor.listar()
    resposta.status(200)
    resposta.send(
        JSON.stringify(resultados)
    )
})

// metodo criar
roteador.post('/', async (requisicao, resposta) => {
    try {
        const dadosRecebidos = requisicao.body
        const fornecedor = new Fornecedor(dadosRecebidos)
        await fornecedor.criar()
        resposta.status(201)
        resposta.send(
            JSON.stringify(fornecedor)
        )
    }
    catch(erro) {
        resposta.send(
            JSON.stringify({
                messagem: erro.message
            })
        )
    }
})


//metodo buscar fornecedor
roteador.get('/: idFornecedor', async (requisicao, resposta) => {
    try{
        const id = requisicao.params.idFornecedor
        const fornecedor = new Fornecedor({id: id})
        await fornecedor.carregar()
        resposta.status(200)
        resposta.send(
            JSON.stringify(fornecedor)
        )
    }
    catch (erro){
        resposta.send(
            JSON.stringify({
                mensagem: erro.message
            })
        )
    }
})

//metodo para atualizar fornecedores
roteador.put('/: idFornecedor', async (requisicao, resposta) => {
    try {

        const id = requisicao.params.idFornecedor
        const dadosRecebidos = requisicao.body
        const dados = Object.assign({}, dadosRecebidos, { id: id })
        const fornecedor = new Fornecedor(dados)
        await fornecedor.atualizar()
        resposta.end()
    }
    catch (erro){
        if (erro instanceof NaoEncontrado){
            resposta.status(404)
        }
        else {
            resposta.status(400)
        }
        resposta.send(
            JSON.stringify({
                mensagem: erro.message,
                id: erro.idErro
            })
        )
    }
})

//metodo para remover fornecedores
roteador.delete('/: idFornecedor', async (requisicao, resposta) => {
    try {
        const id = requisicao.params.idFornecedor
        const fornecedor = new Fornecedor ({ id: id})
        await fornecedor.carregar()
        await fornecedor.remover()
        resposta.status(204)
        resposta.end()
    }
    catch (erro){
        resposta.send(
            JSON.stringify({
                mensagem: erro.message
            })
        )
    }
})

module.exports = roteador   