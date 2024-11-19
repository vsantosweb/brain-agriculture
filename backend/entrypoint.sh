#!/bin/sh


# Defina o diretório de trabalho
WORKDIR=/usr/src/app
cd $WORKDIR

# Executa os comandos necessários
cp .env.example .env

node ace generate:key
node ace migration:status
node ace list:routes 

# Inicie a aplicação
echo "Iniciando a aplicação..."
node ace serve --watch

