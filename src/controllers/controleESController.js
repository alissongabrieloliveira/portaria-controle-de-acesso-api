const {
  listarMovimentacoes,
  buscarEntradaPorId,
} = require("../models/controleESModel");

// GET lista todas as movimentações
async function listar(req, res) {
  try {
    const movimentacoes = await listarMovimentacoes();
    res.status(200).json({ movimentacoes });
  } catch (err) {
    console.error("Erro ao listar movimentações:", err);
    res.status(500).json({ error: "Erro ao buscar movimentações." });
  }
}

// GET lista uma movimentação especifica por id
async function buscarEntrada(req, res) {
  const { id } = req.params;

  if (!id || isNaN(id)) {
    return res.status(400).json({ error: "ID inválido." });
  }

  try {
    const entrada = await buscarEntradaPorId(id);

    if (!entrada) {
      return res.status(404).json({ error: "Entrada não encontrada." });
    }

    res.status(200).json({ entrada });
  } catch (err) {
    console.error("Erro ao buscar entrada:", err);
    res.status(500).json({ error: "Erro ao buscar entrada." });
  }
}

module.exports = {
  listar,
  buscarEntrada,
};
