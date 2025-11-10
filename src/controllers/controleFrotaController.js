const {
  listarMovimentacoesFrota,
  buscarMovimentacaoFrotaPorId,
  registrarEntradaFrota,
  associarPessoasNaFrota,
  registrarSaidaFrota,
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
    id_pessoas,
  } = req.body;

  const id_usuario_entrada = req.usuario?.id;

  if (!id_usuario_entrada || !km_inicial || !id_posto_controle || !id_veiculo) {
    return res.status(400).json({
      error: "Campos obrigatórios: km_inicial, id_posto_controle e id_veiculo.",
    });
  }

  try {
    const novaEntrada = await registrarEntradaFrota({
      km_inicial,
      id_usuario_entrada,
      id_posto_controle,
      id_veiculo,
      id_cidade_destino: id_cidade_destino || null, // permitido nulo
      motivo,
    });

    if (id_pessoas && Array.isArray(id_pessoas) && id_pessoas.length > 0) {
      await associarPessoasNaFrota(novaEntrada.id, id_pessoas);
    }

    res.status(201).json({
      message: "Entrada de frota registrada com sucesso.",
      entrada: novaEntrada,
      pessoas_associadas: id_pessoas || [],
    });
  } catch (err) {
    console.error("Erro ao registrar entrada da frota:", err);
    res.status(500).json({ error: "Erro ao registrar entrada da frota." });
  }
}

// PACTH atualiza dados de saída de um registro de entrada
async function registrarSaida(req, res) {
  const { id } = req.params;
  const { km_final, id_cidade_destino } = req.body;
  const id_usuario_saida = req.usuario?.id;

  if (!id || isNaN(id)) {
    return res.status(400).json({ error: "ID inválido." });
  }

  if (!km_final || !id_usuario_saida || !id_cidade_destino) {
    return res
      .status(400)
      .json({ error: "Campos obrigatórios: km_final, id_cidade_destino." });
  }

  try {
    const saida = await registrarSaidaFrota({
      id,
      km_final,
      id_usuario_saida,
      id_cidade_destino,
    });

    if (!saida) {
      return res.status(404).json({ error: "Movimentação não encontrada." });
    }

    res.status(200).json({
      message: "Saída registrada com sucesso.",
      saida,
    });
  } catch (err) {
    console.error("Erro ao registrar saída da frota:", err);
    res.status(500).json({ error: "Erro ao registrar saída da frota." });
  }
}

module.exports = {
  listar,
  buscarPorId,
  registrarEntrada,
  registrarSaida,
};
