const prisma = require('../lib/prisma');

async function listarBarbeiros(req, res) {
  try {
    const barbeiros = await prisma.barbeiro.findMany({ orderBy: { id: 'desc' } });
    return res.status(200).json(barbeiros);
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao listar barbeiros.', error: error.message });
  }
}

async function criarBarbeiro(req, res) {
  try {
    const { nome, especialidade, ativo } = req.body;
    if (!nome) return res.status(400).json({ message: 'Nome é obrigatório.' });
    const barbeiro = await prisma.barbeiro.create({ data: { nome, especialidade, ativo: ativo ?? true } });
    return res.status(201).json(barbeiro);
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao criar barbeiro.', error: error.message });
  }
}

async function atualizarBarbeiro(req, res) {
  try {
    const id = Number(req.params.id);
    const { nome, especialidade, ativo } = req.body;
    if (!id) return res.status(400).json({ message: 'ID inválido.' });
    if (!nome) return res.status(400).json({ message: 'Nome é obrigatório.' });
    const barbeiro = await prisma.barbeiro.update({ where: { id }, data: { nome, especialidade, ativo: ativo ?? true } });
    return res.status(200).json(barbeiro);
  } catch (error) {
    if (error.code === 'P2025') return res.status(404).json({ message: 'Barbeiro não encontrado.' });
    return res.status(500).json({ message: 'Erro ao atualizar barbeiro.', error: error.message });
  }
}

async function deletarBarbeiro(req, res) {
  try {
    const id = Number(req.params.id);
    if (!id) return res.status(400).json({ message: 'ID inválido.' });
    await prisma.barbeiro.delete({ where: { id } });
    return res.status(204).send();
  } catch (error) {
    if (error.code === 'P2025') return res.status(404).json({ message: 'Barbeiro não encontrado.' });
    return res.status(500).json({ message: 'Erro ao deletar barbeiro.', error: error.message });
  }
}

module.exports = { listarBarbeiros, criarBarbeiro, atualizarBarbeiro, deletarBarbeiro };
