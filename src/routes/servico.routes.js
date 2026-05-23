const express = require('express');
const authMiddleware = require('../middlewares/auth.middleware');
const { listarServicos, criarServico, atualizarServico, deletarServico } = require('../controllers/servico.controller');

const router = express.Router();

router.use(authMiddleware);
router.get('/', listarServicos);
router.post('/', criarServico);
router.put('/:id', atualizarServico);
router.delete('/:id', deletarServico);

module.exports = router;
