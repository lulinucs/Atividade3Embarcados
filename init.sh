#!/bin/bash

# Lista de arquivos .js a serem executados
arquivos_js=("APIGateway/api-gateway.js" "accessAuth/accessAuth-service.js" "accessControl/accessControl-service.js" "accessLog/accessLog-service.js" "users/users-service.js" "labs/labs-service.js")

# Loop pelos arquivos da lista
for arquivo in "${arquivos_js[@]}"
do
  echo "Executando o arquivo $arquivo"
  node "$arquivo" > "$arquivo.log" 2>&1 &
done

echo "Todos os arquivos foram iniciados."