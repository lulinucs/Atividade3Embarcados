const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();

// Servidor
const porta = 8083;
app.listen(porta, () => {
    console.log('Servidor em execução na porta: ' + porta);
});


const accessControl = require('./model/accessControl')

// Acesso ao BD
const MongoClient = require('mongodb').MongoClient;
const uri = 'mongodb+srv://lulinucs:v1d4l0k4@atividade3embarcados.kgfw8cj.mongodb.net/?retryWrites=true&w=majority';

const database_name = 'Atividade3';
const collection_name = 'accessAuth'
let db;

MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((client) => {
        db = client.db(database_name).collection(collection_name);
        console.log('Conectado à base de dados ` ' + database_name + ' `!');
    })
    .catch((error) => {
        console.log('ERRO: não foi possível conectar à base de dados ` ' + database_name + ' `.');
        throw error;
    });

// Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/ConcederAcesso', async (req, res) => {

    const newAccess = new accessControl({
        "nrosala": req.body.nrosala,
        "centro": req.body.centro,
        "usersallow": req.body.mat
    });

    try {
        const response = await axios.get('http://localhost:8080/CadastroUser');
        const user = response.data.find(u => u.mat == newAccess.usersallow);
        if (!user) {
            console.log('Usuário não existe!');
            res.status(400).send('Usuário não existe!');
            return;
        }

        let resultMongo;
        try {
            resultMongo = await db.find({}).toArray();
        } catch (err) {
            console.log("Erro no acesso ao bd local: " + err);
        }

        const labLocal = resultMongo.find(l => l.nrosala == newAccess.nrosala && l.centro == newAccess.centro);
        if (!labLocal) {
            const response = await axios.get('http://localhost:8081/CadastroLabs');
            const labExt = response.data.find(l => l.nrosala == newAccess.nrosala && l.centro == newAccess.centro);
            if (!labExt) {
                console.log('Laboratório não existe!');
                res.status(400).send('Laboratório não existe!');
                return;
            }
        }

        db.updateOne(
            { nrosala: newAccess.nrosala, centro: newAccess.centro },
            { $push: { usersallow: newAccess.usersallow } },
            { upsert: true }
        )
            .then(() => {
                console.log("Acesso do usuário concedido ao laboratório!");
                res.status(200).send('Acesso concedido!');
            })
            .catch((error) => {
                console.error("Erro: " + error)
                res.status(500).send('Erro ao conceder acesso!');
            });

    } catch (error) {
        console.log(error);
        res.status(500).send('Erro ao consultar usuários!');
    }
});

app.get('/VerificarAcessos', async (req, res) => {
    try {
        const result = await db.find({}).toArray();
        console.log("Consulta de laboratórios x permissões enviada!");
        res.status(200).send(result);
    } catch (err) {
        console.log("Erro: " + err);
        res.status(500).send('Erro ao obter dados.');
    }

});

