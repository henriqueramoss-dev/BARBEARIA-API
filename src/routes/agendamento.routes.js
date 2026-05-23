const express = require('express');
const authMiddleware = require('../middlewares/auth.middleware');
const { listarAgendamentos, buscarAgendamento, criarAgendamento, atualizarAgendamento, deletarAgendamento } = require('../controllers/agendamento.controller');

const router = express.Router();

router.use(authMiddleware);
router.get('/', listarAgendamentos);
router.get('/:id', buscarAgendamento);
router.post('/', criarAgendamento);
router.put('/:id', atualizarAgendamento);
router.delete('/:id', deletarAgendamento);

module.exports = router;
