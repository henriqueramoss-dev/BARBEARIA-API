require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const authRoutes = require('./routes/auth.routes');
const clienteRoutes = require('./routes/cliente.routes');
const barbeiroRoutes = require('./routes/barbeiro.routes');
const servicoRoutes = require('./routes/servico.routes');
const agendamentoRoutes = require('./routes/agendamento.routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/', (req, res) => {
  return res.status(200).json({
    message: 'API da Barbearia rodando!',
    deploy: 'https://barbearia-api-v36t.onrender.com',
    docs: {
      health: '/api/health',
      auth: {
        register: 'POST /api/auth/register',
        login: 'POST /api/auth/login',
        me: 'GET /api/auth/me'
      },
      recursos: {
        clientes: '/api/clientes',
        barbeiros: '/api/barbeiros',
        servicos: '/api/servicos',
        agendamentos: '/api/agendamentos'
      }
    }
  });
});

app.get('/api', (req, res) => {
  return res.status(200).json({
    message: 'Rotas disponiveis na API da Barbearia.',
    endpoints: [
      'GET /api/health',
      'POST /api/auth/register',
      'POST /api/auth/login',
      'GET /api/auth/me',
      'GET /api/clientes',
      'GET /api/barbeiros',
      'GET /api/servicos',
      'GET /api/agendamentos'
    ]
  });
});

app.get('/api/health', (req, res) => {
  return res.status(200).json({ message: 'API da Barbearia rodando!' });
});

app.use('/api/auth', authRoutes);
app.use('/api/clientes', clienteRoutes);
app.use('/api/barbeiros', barbeiroRoutes);
app.use('/api/servicos', servicoRoutes);
app.use('/api/agendamentos', agendamentoRoutes);

app.use((req, res) => {
  return res.status(404).json({ message: 'Rota não encontrada.' });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
