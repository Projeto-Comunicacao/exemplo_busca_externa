const express = require('express')
const cors = require("cors")
const app = express()
const port = 3000

app.use(cors())
app.use(express.json({ limit: '1024mb' }));
app.use(express.urlencoded({ extended: true }))
app.get('/', (req, res) => res.send('Hello World!'))


// enviar uma resposta simples e/ou um arquivo
app.post("/info", (req, res) => {

    console.log(req.body) // informações presentes no body

    res.send({
        isSend: true, // Se marcado como true, envia as mensagens descritas em mensagens a enviar.
        mensagens_a_enviar: ['Você está em uma API TESTE com integração.\nSegue o Manual em anexo.', 
        'file-link=http://www.africau.edu/images/default/sample.pdf'], // mensagens a serem enviadas pra o usuário
        variaveis: { // variaveis a serem armazenada durante o fluxo da conversa.
            versao_api: "1.0.0"
        }
    })
})

// enviar uma pergunta
app.post("/perguntaSimples", (req, res) => {

    console.log(req.body.versao_api) // Variável passada na etapa anterior

    res.send({
        isSend: true, // Se marcado como true, envia as mensagens descritas em mensagens a enviar.
        isWaitUser: true, // Se marcado com true informa ao robô que deseja esperar por uma resposta do usuário
        mensagens_a_enviar: ['O que deseja construir com nossa api?'], // mensagens a serem enviadas pra o usuário
    })
})

// enviando pergunta com opções
app.post("/perguntaComOpcoes", (req, res) => {
    res.send({
        isSend: true,
        isWaitUser: true,
        mensagens_a_enviar: [`A sua resposta foi: ${req.body.resposta} \n\n_escolha uma das opções abaixo_👇🏻`], // deve ser passado apenas um elemento no array
        options: [{ option: 'Sim' }, { option: 'Não' }], // opções a serem enviadas
        variaveis: {
            opcoes: JSON.stringify([{ valor : 'Sim' }, { valor : 'Não' } ]) // aqui pode mandar um array contendo todas as informações.
        }
    })
})

// recebendo resposta com opções
app.post("/recebendoRespota", (req, res) => {
    const { option, opcoes } = req.body;

    var intOption = parseInt(option) - 1

    var valor = opcoes[intOption].valor

    console.log(valor) // Sim ou Não

    // apenas passa para a próxima etapa
    res.send({
        isSend: false, // não envia nenhuma mensagme para o usuário
        isWaitUser: false, // não espera nenhuma resposa do usuário
    })

})

// encaminhar para um departamento
// para que essa resposa funcione corretamente consulte a lista de departamentos criado em sua conta
// obtenha o id do departamento
// encaminhar para um atendente
// Obtenha o id do atendente
app.post("/transferirAtendimento", (req, res) => {
    res.send({
        isSend: true,
        mensagens_a_enviar: [`Aguarde você está sendo encaminhada para o departamento Financeiro`], // deve ser passado apenas um elemento no array
        transferDepartamento: '71f0f1d-cd50-ca6-48ce-2ed417a51ec',
        transferAtendente: '',
        transferComentario: 'Adicionado via api!'
    })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))