const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Hello
app.get('/hello', (req, res) => {
    res.send('Hello World');
});

// Servidor
const porta = 8080;
app.listen(porta, () => {
    console.log('Servidor em execução na porta: ' + porta);
});


const Cadastro = require('./model/users')

// Acesso ao BD
const MongoClient = require('mongodb').MongoClient;
const uri = 'mongodb+srv://lulinucs:v1d4l0k4@atividade3embarcados.kgfw8cj.mongodb.net/?retryWrites=true&w=majority';

const database_name = 'Atividade3';
const collection_name = 'users'
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

app.post('/CadastroUser', async (req, res, next) => {
    const cliente = new Cadastro({
        "nome": req.body.nome,
        "cat": req.body.cat,
        "cod": req.body.cod,
        "mat": req.body.mat
    });
    try {
        const result = await db.insertOne(cliente);
        console.log('Cliente cadastrado com sucesso!');
        res.status(200).send('Cliente cadastrado com sucesso!');
    } catch (err) {
        console.log("Error: " + err);
        res.status(500).send('Erro ao cadastrar cliente.');
    }
});

// Obtém todos os cadastros
app.get('/CadastroUser', async (req, res, next) => {
    try {
        const result = await db.find({}).toArray();
        console.log("Total de clientes na base de dados: " + result.length);
        res.status(200).send(result);
    } catch (err) {
        console.log("Erro: " + err);
        res.status(500).send('Erro ao obter dados.');
    }
});

// Obtém cadastro do usuário com base no CPF
app.get('/CadastroUser/:mat', async (req, res, next) => {
    try {
        const result = await db.findOne({ "mat": req.params.mat });
        if (result == null) {
            console.log("Cliente não encontrado.");
            res.status(404).send('Cliente não encontrado.');
        } else {
            res.status(200).send(result);
        }
    } catch (err) {
        console.log("Erro: " + err);
        res.status(500).send('Erro ao obter dados.');
    }
});

// Altera um cadastro
app.put('/CadastroUser/:mat', async (req, res, next) => {
    try {
        const result = await db.updateOne(
            { "mat": req.params.mat },
            {
                $set: {
                    "nome": req.body.nome,
                    "cat": req.body.cat,
                    "cod": req.body.cod
                },
            }
        );
        if (result.modifiedCount == 0) {
            console.log("Cliente não encontrado.");
            res.status(404).send("Cliente não encontrado.");
        } else {
            console.log("Cliente alterado com sucesso!");
            res.status(200).send("Cliente alterado com sucesso!");
        }
    } catch (err) {
        console.log("Error: " + err);
        res.status(500).send("Erro ao alterar dados do cliente.");
    }
});

//Remover cadastro de usuário
app.delete('/CadastroUser/:mat', async (req, res, next) => {
    try {
        const result = await db.deleteOne({ mat: req.params.mat });
        if (result.deletedCount == 0) {
            console.log("Cliente não encontrado.");
            res.status(404).send("Cliente não encontrado.");
        } else {
            console.log("Cliente removido!");
            res.status(200).send("Cliente removido!");
        }
    } catch (err) {
        console.log("Error: " + err);
        res.status(500).send("Erro ao remover dados do cliente.");
    }
});
