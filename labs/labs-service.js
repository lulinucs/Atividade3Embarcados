const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Servidor
const porta = 8081;
app.listen(porta, () => {
    console.log('Servidor em execução na porta: ' + porta);
});


const Cadastro = require('./model/labs')

// Acesso ao BD
const MongoClient = require('mongodb').MongoClient;
const uri = 'mongodb+srv://lulinucs:v1d4l0k4@atividade3embarcados.kgfw8cj.mongodb.net/?retryWrites=true&w=majority';

const database_name = 'Atividade3';
const collection_name = 'labs'
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

app.post('/CadastroLabs', async (req, res, next) => {
    const cliente = new Cadastro({
        "nrosala": req.body.nrosala,
        "centro": req.body.centro
    });
    try {
        const result = await db.insertOne(cliente);
        console.log('Laboratório cadastrado com sucesso!');
        res.status(200).send('Laboratório cadastrado com sucesso!');
    } catch (err) {
        console.log("Error: " + err);
        res.status(500).send('Erro ao cadastrar cliente.');
    }
});

// Obtém todos os cadastros
app.get('/CadastroLabs', async (req, res, next) => {
    try {
        const result = await db.find({}).toArray();
        console.log("Total de laboratórios na base de dados: " + result.length);
        res.status(200).send(result);
    } catch (err) {
        console.log("Erro: " + err);
        res.status(500).send('Erro ao obter dados.');
    }
});

// Obtém cadastro do usuário com base no CPF
app.get('/CadastroLabs/:nrosala', async (req, res, next) => {
    try {
        const result = await db.findOne({ "nrosala": req.params.nrosala });
        if (result == null) {
            console.log("Cliente não encontrado.");
            res.status(404).send('Laboratório não encontrado.');
        } else {
            res.status(200).send(result);
        }
    } catch (err) {
        console.log("Erro: " + err);
        res.status(500).send('Erro ao obter dados.');
    }
});


//Remover cadastro de usuário
app.delete('/CadastroLabs/:nrosala', async (req, res, next) => {
    try {
        const result = await db.deleteOne({ cpf: req.params.cpf });
        if (result.deletedCount == 0) {
            console.log("Laboratório não encontrado.");
            res.status(404).send("Laboratório não encontrado.");
        } else {
            console.log("Laboratório removido!");
            res.status(200).send("Laboratório removido!");
        }
    } catch (err) {
        console.log("Error: " + err);
        res.status(500).send("Erro ao remover dados do Laboratório.");
    }
});
