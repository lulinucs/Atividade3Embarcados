const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();

const accessAuth = require('./model/accessAuth')

// Servidor
const porta = 8084;
app.listen(porta, () => {
    console.log('Servidor em execução na porta: ' + porta);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/EnviarCredenciais', async (req, res) => {
    const send = new accessAuth({
        "nrosala": req.body.nrosala,
        "centro": req.body.centro,
        "mat": req.body.mat
    });

    axios.post('http://localhost:8086/SalvarLog', {
        nrosala: send.nrosala,
        centro: send.centro,
        mat: send.mat
    })
    .then((response) => {
        console.log(response.data);
    })
    .catch((error) => {
        console.log(error);
    })

    let result;

    try {
        result = await axios.get('http://localhost:8083/VerificarAcessos');

    } catch (error) {
        console.log(error);
        res.status(500).send(error);

    }

    const lab = result.data.find(l => l.nrosala == send.nrosala && l.centro == send.centro);
    if (!lab) {
        console.log('Acesso negado. Laboratório não encontrado');
        res.status(400).send('Laboratório não encontrado.')
        return
    } else {
        for (i = 0; i < lab.usersallow.length; i++) {
            if (lab.usersallow[i] == send.mat) {
                console.log('Acesso liberado!');
                res.status(200).send('Acesso liberado!');
                return
            } else {
                console.log('Acesso Negado');
            }
        }
        res.status(500).send('Acesso Negado!');
    }
});