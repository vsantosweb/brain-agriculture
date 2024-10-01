#!/bin/sh


# Defina o diretório de trabalho
WORKDIR=/usr/src/app
cd $WORKDIR

npm run build --production

# Executa os comandos necessários
cp .env.example .env

node ace generate:key

# Execute as migrações do banco de dados, se necessário
echo "Executando migrações..."

node ace migration:fresh

node ace db:seed

cp .env ./build/.env

cd build

npm ci --omit="dev"

# Inicie a aplicação
echo "Iniciando a aplicação..."

node bin/server.js
