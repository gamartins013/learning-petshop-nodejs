const tabelaFornecedor = require('./tabelaFornecedor')
// criacao do constructor do objeto fornecedor
class Fornecedor {
    constructor ({ id, empresa, email, categoria, dataCriacao, dataAtualizacao, versao }) {
        this.id = id
        this.empresa = empresa
        this.email = email
        this.categoria = categoria
        this.dataCriacao = dataCriacao
        this.dataAtualizacao = dataAtualizacao
        this.versao = versao
    }

    async criar () {
        this.validar()
        const resultado = await tabelaFornecedor.inserir({
            empresa: this.empresa,
            email: this.email,
            categoria: this.categoria
        })  

        this.id = resultado.id
        this.dataCriacao = resultado.dataCriacao
        this.dataAtualizacao = resultado.dataAtualizacao    
        this.versao = resultado.versao
    }

    async carregar () {
        const encontrado = await tabelaFornecedor.pegarPorId
        (this.id)
        this.empresa = encontrado.empresa
        this.email = encontrado.email
        this.categora = encontrado.categoria
        this.dataCriacao = encontrado.dataCriacao
        this.dataAtualizacao = encontrado.dataAtualizacao
        this.versao = encontrado.versao
    }

    async atualizar(){
        await tabelaFornecedor.pegarPorId(this.id)
        const campos = ['empresa', 'email', 'categoria']
        const dadosParaAtualizar = {}
        
        campos.forEach((campo) =>{
            const valor = this[campo]

            if (typeof valor === 'string' && valor.length > 0 ) {
                dadosParaAtualizar[campo] = valor
            }
        })

        if (Object.keys(dadosParaAtualizar).length === 0 ){
            throw new Error ('Não foram fornecido dados para Atualizar')
        }

        await tabelaFornecedor.atualizar(this.id, dadosParaAtualizar)
    }

    remover () {
        returntabelaFornecedor.remover(this.id)
    }

    validar() {
        const campos = ['empresa', 'email', 'categoria']

        campos.forEach(campo => {
            const valor = this[campo]

            if (typeof valor !== 'string') {
                throw new Error (`O campo '${campo}' está invalido`)
            }
        })
    }
 }
   


module.exports = Fornecedor

