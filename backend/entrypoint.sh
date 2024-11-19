#!/bin/sh


# Defina o diretório de trabalho
WORKDIR=/usr/src/app
cd $WORKDIR

if [ ! -d "node_modules" ]; then
    echo "Aguardando instalação de dependências..."
    npm install
fi

# Executa os comandos necessários
cp .env.example .env

node ace generate:key
node ace migration:status
node ace list:routes 
node ace migration:fresh --seed

# Inicie a aplicação
echo "Iniciando a aplicação..."
node ace serve --watch



exec "$@"