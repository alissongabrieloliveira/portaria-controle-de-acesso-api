const {
  listarMovimentacoesFrota,
  buscarMovimentacaoFrotaPorId,
} = require("../models/controleFrotaModel");

// GET lista todas as movimentações da frota
async function listar(req, res) {
  try {
    const movimentacoes = await listarMovimentacoesFrota();
    res.status(200).json({ movimentacoes });
  } catch (err) {
    console.error("Erro ao listar movimentações da frota:", err);
    res.status(500).json({ error: "Erro ao buscar movimentações da frota." });
  }
}

// GET lista uma movimentação especifica da frota propria por id
async function buscarPorId(req, res) {
  const { id } = req.params;

  if (!id || isNaN(id)) {
    return res.status(400).json({ error: "ID inválido." });
  }

  try {
    const movimentacao = await buscarMovimentacaoFrotaPorId(id);

    if (!movimentacao) {
      return res.status(404).json({ error: "Movimentação não encontrada." });
    }

    res.status(200).json({ movimentacao });
  } catch (err) {
    console.error("Erro ao buscar movimentação da frota:", err);
    res.status(500).json({ error: "Erro ao buscar movimentação da frota." });
  }
}

module.exports = {
  listar,
  buscarPorId,
};
