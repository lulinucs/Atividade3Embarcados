const httpProxy = require('express-http-proxy');
const express = require('express');
const app = express();
var logger = require('morgan');
const cors = require('cors');

app.use(logger('dev'));
app.use(cors());

function selectProxyHost(req) {
    if (req.path.startsWith('/CadastroUser'))
        return 'http://localhost:8080/';
    else if (req.path.startsWith('/CadastroLabs'))
        return 'http://localhost:8081/';
    else if (req.path.startsWith('/SalvarLog') || req.path.startsWith('/BaixarLogs'))
        return 'http://localhost:8086/';
    else if (req.path.startsWith('/ConcederAcesso') || req.path.startsWith('/VerificarAcessos'))
        return 'http://localhost:8083'
    else if (req.path.startsWith('/EnviarCredenciais'))
        return 'http://localhost:8084'
    else return null;
}

app.use((req, res, next) => {
    var proxyHost = selectProxyHost(req);
    if (proxyHost == null)
        res.status(404).send('Not found');
    else
        httpProxy(proxyHost)(req, res, next);
});

app.listen(8000, () => {
    console.log('API Gateway iniciado!');
});