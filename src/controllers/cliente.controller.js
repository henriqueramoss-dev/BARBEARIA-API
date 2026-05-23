const prisma = require('../lib/prisma');

async function listarClientes(req, res) {
  try {
    const clientes = await prisma.cliente.findMany({ orderBy: { id: 'desc' } });
    return res.status(200).json(clientes);
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao listar clientes.', error: error.message });
  }
}

async function buscarCliente(req, res) {
  try {
    const id = Number(req.params.id);
    if (!id) return res.status(400).json({ message: 'ID inválido.' });

    const cliente = await prisma.cliente.findUnique({ where: { id }, include: { agendamentos: true } });
    if (!cliente) return res.status(404).json({ message: 'Cliente não encontrado.' });

    return res.status(200).json(cliente);
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao buscar cliente.', error: error.message });
  }
}

async function criarCliente(req, res) {
  try {
    const { nome, telefone, email } = req.body;
    if (!nome || !telefone) return res.status(400).json({ message: 'Nome e telefone são obrigatórios.' });

    const cliente = await prisma.cliente.create({ data: { nome, telefone, email: email || null } });
    return res.status(201).json(cliente);
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao criar cliente.', error: error.message });
  }
}

async function atualizarCliente(req, res) {
  try {
    const id = Number(req.params.id);
    const { nome, telefone, email } = req.body;
    if (!id) return res.status(400).json({ message: 'ID inválido.' });
    if (!nome || !telefone) return res.status(400).json({ message: 'Nome e telefone são obrigatórios.' });

    const cliente = await prisma.cliente.update({ where: { id }, data: { nome, telefone, email: email || null } });
    return res.status(200).json(cliente);
  } catch (error) {
    if (error.code === 'P2025') return res.status(404).json({ message: 'Cliente não encontrado.' });
    return res.status(500).json({ message: 'Erro ao atualizar cliente.', error: error.message });
  }
}

async function deletarCliente(req, res) {
  try {
    const id = Number(req.params.id);
    if (!id) return res.status(400).json({ message: 'ID inválido.' });

    await prisma.cliente.delete({ where: { id } });
    return res.status(204).send();
  } catch (error) {
    if (error.code === 'P2025') return res.status(404).json({ message: 'Cliente não encontrado.' });
    return res.status(500).json({ message: 'Erro ao deletar cliente.', error: error.message });
  }
}

module.exports = { listarClientes, buscarCliente, criarCliente, atualizarCliente, deletarCliente };
