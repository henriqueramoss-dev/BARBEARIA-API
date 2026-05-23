const prisma = require('../lib/prisma');

async function listarServicos(req, res) {
  try {
    const servicos = await prisma.servico.findMany({ orderBy: { id: 'desc' } });
    return res.status(200).json(servicos);
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao listar serviços.', error: error.message });
  }
}

async function criarServico(req, res) {
  try {
    const { nome, descricao, preco, duracaoMinutos, ativo } = req.body;
    if (!nome || preco === undefined || !duracaoMinutos) return res.status(400).json({ message: 'Nome, preço e duração são obrigatórios.' });
    if (Number(preco) <= 0) return res.status(400).json({ message: 'Preço deve ser maior que zero.' });
    const servico = await prisma.servico.create({ data: { nome, descricao, preco, duracaoMinutos: Number(duracaoMinutos), ativo: ativo ?? true } });
    return res.status(201).json(servico);
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao criar serviço.', error: error.message });
  }
}

async function atualizarServico(req, res) {
  try {
    const id = Number(req.params.id);
    const { nome, descricao, preco, duracaoMinutos, ativo } = req.body;
    if (!id) return res.status(400).json({ message: 'ID inválido.' });
    if (!nome || preco === undefined || !duracaoMinutos) return res.status(400).json({ message: 'Nome, preço e duração são obrigatórios.' });
    const servico = await prisma.servico.update({ where: { id }, data: { nome, descricao, preco, duracaoMinutos: Number(duracaoMinutos), ativo: ativo ?? true } });
    return res.status(200).json(servico);
  } catch (error) {
    if (error.code === 'P2025') return res.status(404).json({ message: 'Serviço não encontrado.' });
    return res.status(500).json({ message: 'Erro ao atualizar serviço.', error: error.message });
  }
}

async function deletarServico(req, res) {
  try {
    const id = Number(req.params.id);
    if (!id) return res.status(400).json({ message: 'ID inválido.' });
    await prisma.servico.delete({ where: { id } });
    return res.status(204).send();
  } catch (error) {
    if (error.code === 'P2025') return res.status(404).json({ message: 'Serviço não encontrado.' });
    return res.status(500).json({ message: 'Erro ao deletar serviço.', error: error.message });
  }
}

module.exports = { listarServicos, criarServico, atualizarServico, deletarServico };
