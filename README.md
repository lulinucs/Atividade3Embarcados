# Atividade 3 - Backend

Neste repositório, você encontrará a implementação do backend de um sistema para controle de acesso às salas de aula e laboratórios do CTC (Centro Tecnológico) da UFSC (Universidade Federal de Santa Catarina). O sistema utiliza o cartão de identificação da UFSC para gerenciar o acesso.

## Microservices

O backend é composto por cinco microservices, cada um responsável por uma funcionalidade específica:

1. **Cadastro de Usuários:** Mantém os dados de cada usuário do sistema, incluindo nome, tipo de usuário (estudante, técnico ou professor), código do curso (para estudantes) ou setor de lotação (técnico ou professor) e número de matrícula.

2. **Cadastro de Salas:** Registra as salas do CTC que possuem controle de acesso eletrônico. Armazena o número da sala e a identificação do prédio no qual a sala está localizada.

3. **Controle de Acesso:** Mantém registros dos usuários que têm acesso a cada sala cadastrada no sistema.

4. **Liberação de Acesso:** Recebe um usuário e uma sala como entrada e determina se o usuário deve ter acesso à sala (a porta deve ser aberta) ou não.

5. **Registro de Acessos:** Registra todas as tentativas de acesso às salas do CTC.

## API Gateway

O acesso aos microservices é feito por meio de um API Gateway, que fornece uma interface REST para acesso aos serviços. As interações entre o API Gateway e os microservices também são realizadas por meio de requisições REST.

## Tecnologias Utilizadas

Os microservices e o API Gateway foram implementados utilizando [Node.js](https://nodejs.org/). Para o armazenamento de dados, foi utilizado [MongoDB](https://www.mongodb.com/) como servidor de banco de dados. Cada microservice possui seu próprio banco de dados ou collection para garantir a separação dos dados entre os serviços.

## Instruções de Uso

Este repositório contém a implementação dos microservices e do API Gateway. Para testar o funcionamento do backend, você pode utilizar ferramentas como o [Postman](https://www.postman.com/) para enviar requisições de teste aos serviços.

Certifique-se de ter o Node.js e o MongoDB instalados em sua máquina. Siga as instruções de instalação e configuração de cada microservice e do API Gateway nos respectivos diretórios.

## Observações

Neste repositório, você encontrará apenas a implementação dos microservices e do API Gateway. Os frontends, como leitores de cartão e aplicativos de gerenciamento, não foram implementados nesta atividade.

Caso você queira usar outras tecnologias que não foram abordadas na disciplina, como serviços de mensageria (RabbitMQ, Kafka) ou protocolos como Thrift e gRPC, sinta-se à vontade para explorar essas opções.

Lembre-se de seguir as boas práticas de programação e segurança ao desenvolver e testar o backend.

---

Este projeto foi desenvolvido como parte da disciplina Desenvolvimento de Sistemas Móveis e Embarcados da Universidade Federal de Santa Catarina.

