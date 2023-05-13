const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();

const accessAuth = require('./model/accessAuth')

let auth = false;

// Servidor
const porta = 8084;
app.listen(porta, () => {
    console.log('Servidor em execução na porta: ' + porta);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/EnviarCredenciais', async (req, res) => {

    function SalvarLog(auth) {
        axios.post('http://localhost:8086/SalvarLog', {
            nrosala: send.nrosala,
            centro: send.centro,
            auth: auth,
            mat: send.mat,            
        })
        .then((response) => {
            console.log(response.data);
        })
        .catch((error) => {
            console.log(error);
        })
    }

    const send = new accessAuth({
        "nrosala": req.body.nrosala,
        "centro": req.body.centro,
        "mat": req.body.mat
    });

    let result;

    try {
        result = await axios.get('http://localhost:8083/VerificarAcessos');

    } catch (error) {
        console.log(error);
        res.status(500).send(error);

    }

    const lab = result.data.find(l => l.nrosala == send.nrosala && l.centro == send.centro);
    if (!lab) {
        auth = false;
        SalvarLog(auth);
        console.log('Acesso negado. Não há acessos autorizados para este laboratório');
        res.status(400).send('Não há acessos autorizados para este laboratório')
        return
    } else {
        for (i = 0; i < lab.usersallow.length; i++) {
            if (lab.usersallow[i] == send.mat) {
                auth = true;
                SalvarLog(auth);
                console.log('Acesso liberado!');
                res.status(200).send('Acesso liberado!');
                return
            } else {
                auth = false;
                SalvarLog(auth);
                console.log('Acesso Negado');
            }
        }
        res.status(500).send('Acesso Negado!');
    }

});