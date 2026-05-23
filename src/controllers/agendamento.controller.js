const prisma = require('../lib/prisma');

async function listarAgendamentos(req, res) {
  try {
    const agendamentos = await prisma.agendamento.findMany({
      orderBy: { dataHora: 'asc' },
      include: { cliente: true, barbeiro: true, servico: true }
    });
    return res.status(200).json(agendamentos);
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao listar agendamentos.', error: error.message });
  }
}

async function buscarAgendamento(req, res) {
  try {
    const id = Number(req.params.id);
    if (!id) return res.status(400).json({ message: 'ID inválido.' });
    const agendamento = await prisma.agendamento.findUnique({ where: { id }, include: { cliente: true, barbeiro: true, servico: true } });
    if (!agendamento) return res.status(404).json({ message: 'Agendamento não encontrado.' });
    return res.status(200).json(agendamento);
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao buscar agendamento.', error: error.message });
  }
}

async function criarAgendamento(req, res) {
  try {
    const { dataHora, clienteId, barbeiroId, servicoId, observacao } = req.body;
    if (!dataHora || !clienteId || !barbeiroId || !servicoId) {
      return res.status(400).json({ message: 'Data/hora, cliente, barbeiro e serviço são obrigatórios.' });
    }

    const data = new Date(dataHora);
    if (Number.isNaN(data.getTime())) return res.status(400).json({ message: 'Data/hora inválida.' });

    const conflito = await prisma.agendamento.findFirst({
      where: { barbeiroId: Number(barbeiroId), dataHora: data, status: { not: 'CANCELADO' } }
    });
    if (conflito) return res.status(409).json({ message: 'Esse barbeiro já tem agendamento nesse horário.' });

    const agendamento = await prisma.agendamento.create({
      data: { dataHora: data, clienteId: Number(clienteId), barbeiroId: Number(barbeiroId), servicoId: Number(servicoId), observacao },
      include: { cliente: true, barbeiro: true, servico: true }
    });
    return res.status(201).json(agendamento);
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao criar agendamento.', error: error.message });
  }
}

async function atualizarAgendamento(req, res) {
  try {
    const id = Number(req.params.id);
    const { dataHora, clienteId, barbeiroId, servicoId, status, observacao } = req.body;
    if (!id) return res.status(400).json({ message: 'ID inválido.' });
    if (!dataHora || !clienteId || !barbeiroId || !servicoId) return res.status(400).json({ message: 'Data/hora, cliente, barbeiro e serviço são obrigatórios.' });
    const data = new Date(dataHora);
    if (Number.isNaN(data.getTime())) return res.status(400).json({ message: 'Data/hora inválida.' });

    const conflito = await prisma.agendamento.findFirst({
      where: { id: { not: id }, barbeiroId: Number(barbeiroId), dataHora: data, status: { not: 'CANCELADO' } }
    });
    if (conflito) return res.status(409).json({ message: 'Esse barbeiro já tem agendamento nesse horário.' });

    const agendamento = await prisma.agendamento.update({
      where: { id },
      data: { dataHora: data, clienteId: Number(clienteId), barbeiroId: Number(barbeiroId), servicoId: Number(servicoId), status: status || 'AGENDADO', observacao },
      include: { cliente: true, barbeiro: true, servico: true }
    });
    return res.status(200).json(agendamento);
  } catch (error) {
    if (error.code === 'P2025') return res.status(404).json({ message: 'Agendamento não encontrado.' });
    return res.status(500).json({ message: 'Erro ao atualizar agendamento.', error: error.message });
  }
}

async function deletarAgendamento(req, res) {
  try {
    const id = Number(req.params.id);
    if (!id) return res.status(400).json({ message: 'ID inválido.' });
    await prisma.agendamento.delete({ where: { id } });
    return res.status(204).send();
  } catch (error) {
    if (error.code === 'P2025') return res.status(404).json({ message: 'Agendamento não encontrado.' });
    return res.status(500).json({ message: 'Erro ao deletar agendamento.', error: error.message });
  }
}

module.exports = { listarAgendamentos, buscarAgendamento, criarAgendamento, atualizarAgendamento, deletarAgendamento };
