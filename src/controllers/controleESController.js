const {
  listarMovimentacoes,
  buscarEntradaPorId,
  registrarEntrada,
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

// POST registra uma nova entrada
async function registrar(req, res) {
  const {
    km_inicial,
    id_posto_controle,
    id_veiculo,
    id_setor_visitado,
    motivo,
  } = req.body;

  // usuário autenticado vem do token
  const id_usuario_entrada = req.usuario?.id;

  if (!id_usuario_entrada || !id_posto_controle || !id_setor_visitado) {
    return res.status(400).json({
      error:
        "Campos obrigatórios: id_posto_controle, id_setor_visitado e token válido.",
    });
  }

  try {
    const novaEntrada = await registrarEntrada({
      km_inicial: km_inicial || null,
      id_usuario_entrada,
      id_posto_controle,
      id_veiculo: id_veiculo || null,
      id_setor_visitado,
      motivo: motivo || null,
    });

    res.status(201).json({
      message: "Entrada registrada com sucesso.",
      entrada: novaEntrada,
    });
  } catch (err) {
    console.error("Erro ao registrar entrada:", err);
    res.status(500).json({ error: "Erro ao registrar entrada." });
  }
}

module.exports = {
  listar,
  buscarEntrada,
  registrar,
};
