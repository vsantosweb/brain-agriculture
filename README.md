
# Projeto AdonisJS

Este é um projeto desenvolvido em AdonisJS configurado para rodar em ambiente de desenvolvimento local.

## 📋 Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas em sua máquina:

- [Node.js](https://nodejs.org/en/download/) (versão 14+)
- [NPM](https://www.npmjs.com/get-npm) ou [Yarn](https://yarnpkg.com/)
- Um banco de dados compatível (ex: MySQL, PostgreSQL, SQLite)

## 🚀 Configuração do Projeto

### 1. Clonar o Repositório

```bash
git clone https://github.com/vsantosweb/shopper-measure.git
cd shopper-measure
```

### 2. Instalar Dependências

Se estiver usando NPM:

```bash
npm install
```

Se estiver usando Yarn:

```bash
yarn
```

### 3. Configurar Variáveis de Ambiente

Renomeie o arquivo `.env.example` para `.env` e configure as variáveis de ambiente:

```bash
cp .env.example .env
```

Edite o arquivo `.env` para incluir suas configurações de banco de dados:

```env
DB_CONNECTION=mysql
MYSQL_HOST=127.0.0.1
MYSQL_PORT=3306
MYSQL_USER=seu_usuario
MYSQL_PASSWORD=sua_senha
MYSQL_DB_NAME=nome_do_banco
```

### 4. Gerar a APP_KEY

Gere uma chave única para o projeto:

```bash
node ace generate:key
```

### 5. Executar Migrações

Configure a estrutura do banco de dados executando as migrações:

```bash
node ace migration:run
```

### 6. Executar Seeders (Opcional)

Se você deseja popular o banco de dados com dados iniciais, execute:

```bash
node ace db:seed
```

## ☕ Executando o Projeto

Inicie o servidor em modo de desenvolvimento:

```bash
node ace serve --watch
```

O projeto estará disponível em `http://localhost:3333`.

## 📦 Comandos Úteis

- **Rodar Migrações:**
  ```bash
  node ace migration:run
  ```
- **Reverter Migrações:**
  ```bash
  node ace migration:rollback
  ```
- **Executar Seeders:**
  ```bash
  node ace db:seed
  ```

## 🛠️ Dicas

- Mantenha o arquivo `.env` atualizado com suas configurações.
- Certifique-se de que seu banco de dados esteja ativo e acessível antes de rodar as migrações.

---

Feito com ❤️ por [Vitor Santos](https://github.com/vsantosweb)
