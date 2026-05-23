const express = require('express');
const authMiddleware = require('../middlewares/auth.middleware');
const { listarClientes, buscarCliente, criarCliente, atualizarCliente, deletarCliente } = require('../controllers/cliente.controller');

const router = express.Router();

router.use(authMiddleware);
router.get('/', listarClientes);
router.get('/:id', buscarCliente);
router.post('/', criarCliente);
router.put('/:id', atualizarCliente);
router.delete('/:id', deletarCliente);

module.exports = router;
