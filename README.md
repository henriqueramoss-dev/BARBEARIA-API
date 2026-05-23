# Barbearia API

API REST para gerenciamento de uma barbearia. O projeto permite cadastrar usuarios, fazer login com JWT e gerenciar clientes, barbeiros, servicos e agendamentos.

## Tecnologias usadas

- Node.js
- Express
- MySQL
- Prisma ORM
- JWT
- bcrypt
- dotenv
- cors
- nodemon

## Como instalar e rodar localmente

### 1. Instalar dependencias

```bash
npm install
```

### 2. Configurar o banco de dados

Crie um arquivo `.env` na raiz do projeto com as variaveis:

```env
DATABASE_URL="mysql://usuario:senha@localhost:3306/nome_do_banco"
JWT_SECRET="sua_chave_secreta"
PORT=3000
```

Exemplo para MySQL local:

```env
DATABASE_URL="mysql://root:sua_senha@localhost:3306/barbearia_api"
JWT_SECRET="barbearia_secret"
PORT=3000
```

### 3. Gerar o Prisma Client

```bash
npx prisma generate
```

### 4. Rodar as migrations

```bash
npx prisma migrate deploy
```

Ou, em ambiente de desenvolvimento:

```bash
npx prisma migrate dev
```

### 5. Iniciar a API

```bash
npm run dev
```

A API ficara disponivel em:

```txt
http://localhost:3000
```

Para verificar se esta funcionando:

```txt
GET http://localhost:3000/api/health
```

Resposta esperada:

```json
{
  "message": "API da Barbearia rodando!"
}
```

### 6. Criar um usuario inicial

Antes de usar as rotas protegidas, cadastre um usuario:

```txt
POST http://localhost:3000/api/auth/register
```

Body:

```json
{
  "nome": "Administrador",
  "email": "admin@barbearia.com",
  "senha": "123456",
  "perfil": "ADMIN"
}
```

Depois faca login:

```txt
POST http://localhost:3000/api/auth/login
```

Body:

```json
{
  "email": "admin@barbearia.com",
  "senha": "123456"
}
```

Use o token retornado nas rotas protegidas:

```txt
Authorization: Bearer SEU_TOKEN_AQUI
```

## Endpoints

### Sistema

| Metodo | Rota | O que faz |
|---|---|---|
| GET | `/api/health` | Verifica se a API esta rodando |

### Autenticacao

| Metodo | Rota | O que faz |
|---|---|---|
| POST | `/api/auth/register` | Cadastra um novo usuario |
| POST | `/api/auth/login` | Faz login e retorna um token JWT |
| GET | `/api/auth/me` | Retorna os dados do usuario logado |

### Clientes

| Metodo | Rota | O que faz |
|---|---|---|
| GET | `/api/clientes` | Lista todos os clientes |
| GET | `/api/clientes/:id` | Busca um cliente pelo ID |
| POST | `/api/clientes` | Cadastra um novo cliente |
| PUT | `/api/clientes/:id` | Atualiza um cliente pelo ID |
| DELETE | `/api/clientes/:id` | Remove um cliente pelo ID |

### Barbeiros

| Metodo | Rota | O que faz |
|---|---|---|
| GET | `/api/barbeiros` | Lista todos os barbeiros |
| POST | `/api/barbeiros` | Cadastra um novo barbeiro |
| PUT | `/api/barbeiros/:id` | Atualiza um barbeiro pelo ID |
| DELETE | `/api/barbeiros/:id` | Remove um barbeiro pelo ID |

### Servicos

| Metodo | Rota | O que faz |
|---|---|---|
| GET | `/api/servicos` | Lista todos os servicos |
| POST | `/api/servicos` | Cadastra um novo servico |
| PUT | `/api/servicos/:id` | Atualiza um servico pelo ID |
| DELETE | `/api/servicos/:id` | Remove um servico pelo ID |

### Agendamentos

| Metodo | Rota | O que faz |
|---|---|---|
| GET | `/api/agendamentos` | Lista todos os agendamentos |
| GET | `/api/agendamentos/:id` | Busca um agendamento pelo ID |
| POST | `/api/agendamentos` | Cadastra um novo agendamento |
| PUT | `/api/agendamentos/:id` | Atualiza um agendamento pelo ID |
| DELETE | `/api/agendamentos/:id` | Remove um agendamento pelo ID |

## Exemplos de bodies

### Cliente

```json
{
  "nome": "Joao Pereira",
  "telefone": "(11) 97777-1234",
  "email": "joao.pereira@email.com"
}
```

### Barbeiro

```json
{
  "nome": "Carlos Santos",
  "especialidade": "Corte masculino",
  "ativo": true
}
```

### Servico

```json
{
  "nome": "Corte degrade",
  "descricao": "Corte masculino com acabamento",
  "preco": 45.00,
  "duracaoMinutos": 40,
  "ativo": true
}
```

### Agendamento

```json
{
  "dataHora": "2026-06-01T14:00:00",
  "clienteId": 1,
  "barbeiroId": 1,
  "servicoId": 1,
  "observacao": "Cliente prefere corte baixo"
}
```
