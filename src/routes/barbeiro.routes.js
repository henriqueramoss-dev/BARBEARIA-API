const express = require('express');
const authMiddleware = require('../middlewares/auth.middleware');
const { listarBarbeiros, criarBarbeiro, atualizarBarbeiro, deletarBarbeiro } = require('../controllers/barbeiro.controller');

const router = express.Router();

router.use(authMiddleware);
router.get('/', listarBarbeiros);
router.post('/', criarBarbeiro);
router.put('/:id', atualizarBarbeiro);
router.delete('/:id', deletarBarbeiro);

module.exports = router;
