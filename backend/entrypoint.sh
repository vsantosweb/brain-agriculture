#!/bin/sh


# Defina o diretório de trabalho
WORKDIR=/usr/src/app
cd $WORKDIR

# Executa os comandos necessários
cp .env.example .env

node ace generate:key

# Inicie a aplicação
echo "Iniciando a aplicação..."
node ace serve --watch

