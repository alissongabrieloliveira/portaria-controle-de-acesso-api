const {
  listarMovimentacoesFrota,
  buscarMovimentacaoFrotaPorId,
  registrarEntradaFrota,
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

// POST registra uma nova entrada da frota
async function registrarEntrada(req, res) {
  const {
    km_inicial,
    id_posto_controle,
    id_veiculo,
    id_cidade_destino,
    motivo,
  } = req.body;

  const id_usuario_entrada = req.usuario?.id;

  if (
    !id_usuario_entrada ||
    !km_inicial ||
    !id_posto_controle ||
    !id_veiculo ||
    !id_cidade_destino
  ) {
    return res.status(400).json({
      error:
        "Campos obrigatórios: km_inicial, id_posto_controle, id_veiculo, id_cidade_destino.",
    });
  }

  try {
    const novaEntrada = await registrarEntradaFrota({
      km_inicial,
      id_usuario_entrada,
      id_posto_controle,
      id_veiculo,
      id_cidade_destino,
      motivo,
    });

    res.status(201).json({
      message: "Entrada de frota registrada com sucesso.",
      entrada: novaEntrada,
    });
  } catch (err) {
    console.error("Erro ao registrar entrada da frota:", err);
    res.status(500).json({ error: "Erro ao registrar entrada da frota." });
  }
}

module.exports = {
  listar,
  buscarPorId,
  registrarEntrada,
};
