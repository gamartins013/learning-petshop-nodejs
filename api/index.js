const express = require ('express')
const app = express()
const bodyParser = require ('body-parser')
const config = require ('config')

app.use(bodyParser.json())

// router
const roteador = require('./rotas/fornecedores')
app.use('/api/fornecedores', roteador)

// configuração API
app.listen(config.get('api.porta'), () => console.log("A API ESTÁ FUNCIONANDO"))