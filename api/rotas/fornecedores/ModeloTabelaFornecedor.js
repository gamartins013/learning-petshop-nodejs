const Sequelize = require('sequelize')
const instancia = require('../../banco-de-dados')

//criacao colunas da tabela do banco de dados
const colunas = {
    empresa: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: { 
        type: Sequelize.STRING,
        allowNull: false
    },
    categoria: { 
        type: Sequelize.ENUM('ração', 'brinquedos'),
        allowNull: false
    },

}
// criacao de opcoes da tabela do banco de dados
const opcoes = {    
    freezeTableName: true,
    tableName: 'fornecedores',
    timestamps: true,
    createdAt: 'dataCriacao',
    updatedAt: 'dataAtualizacao',
    version: 'versao'
}
module.exports = instancia.define('fornecedor', colunas, opcoes)