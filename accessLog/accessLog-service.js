const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();

const accessLogCadastro = require('./model/accessLog')

app.use(bodyParser.json());

const porta = 8086;
app.listen(porta, () => {
    console.log('Servidor em execução na porta: ' + porta);
});

// Acesso ao BD
const MongoClient = require('mongodb').MongoClient;
const uri = 'mongodb+srv://lulinucs:v1d4l0k4@atividade3embarcados.kgfw8cj.mongodb.net/?retryWrites=true&w=majority';

const database_name = 'Atividade3';
const collection_name = 'accessLog'
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

app.post('/SalvarLog', async (req, res) => {

    const cadastroLog = new accessLogCadastro({
        "nrosala": req.body.nrosala,
        "centro": req.body.centro,
        "mat": req.body.mat
    });

    try {
        const result = await db.insertOne(cadastroLog);
        console.log('Log cadastrado no BD');
        res.status(200).send('Log cadastrado no BD');
    } catch (err) {
        console.log("Error: " + err);
        res.status(500).send('Erro ao cadastrar Log.');
    }
});

app.get('/BaixarLogs', async (req, res, next) => {
    try {
        const result = await db.find({}).toArray();
        console.log("Total de laboratórios na base de dados: " + result.length);
        res.status(200).send(result);
    } catch (err) {
        console.log("Erro: " + err);
        res.status(500).send('Erro ao obter dados.');
    }
});