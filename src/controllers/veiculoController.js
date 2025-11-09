const {
  listarVeiculos,
  buscarVeiculoPorId,
  cadastrarVeiculo,
  atualizarVeiculo,
  deletarVeiculo,
} = require("../models/veiculoModel");

// GET lista todos os veículos
async function listar(req, res) {
  try {
    const veiculos = await listarVeiculos();
    res.status(200).json({ veiculos });
  } catch (err) {
    console.error("Erro ao buscar veículos:", err);
    res.status(500).json({ error: "Erro ao buscar veículos." });
  }
}

// GET listar um veículo especifico por id
async function buscarPorId(req, res) {
  const { id } = req.params;

  if (!id || isNaN(id)) {
    return res.status(400).json({ error: "ID inválido." });
  }

  try {
    const veiculo = await buscarVeiculoPorId(id);

    if (!veiculo) {
      return res.status(404).json({ error: "Veículo não encontrado." });
    }

    res.status(200).json({ veiculo });
  } catch (err) {
    console.error("Erro ao buscar veículo:", err);
    res.status(500).json({ error: "Erro ao buscar veículo." });
  }
}

// POST cadastra um novo veículo
async function cadastrar(req, res) {
  const { placa, marca, modelo, tipo_veiculo, identificacao_veiculo } =
    req.body;

  const tiposValidos = [
    "frota própria",
    "visitante",
    "colaborador",
    "prestador de serviço",
  ];

  if (!placa || !marca || !modelo || !tipo_veiculo) {
    return res.status(400).json({
      error: "Campos obrigatórios: placa, marca, modelo e tipo_veiculo.",
    });
  }

  if (!tiposValidos.includes(tipo_veiculo)) {
    return res.status(400).json({ error: "Tipo de veículo inválido." });
  }

  try {
    const novoVeiculo = await cadastrarVeiculo({
      placa,
      marca,
      modelo,
      tipo_veiculo,
      identificacao_veiculo: identificacao_veiculo || null,
    });

    res.status(201).json({
      message: "Veículo cadastrado com sucesso.",
      veiculo: novoVeiculo,
    });
  } catch (err) {
    if (err.code === "23505") {
      return res.status(409).json({ error: "Placa já cadastrada." });
    }

    console.error("Erro ao cadastrar veículo:", err);
    res.status(500).json({ error: "Erro ao cadastrar veículo." });
  }
}

// PUT atualiza dados de um veículo especifico
async function atualizar(req, res) {
  const { id } = req.params;
  const { placa, marca, modelo, tipo_veiculo, identificacao_veiculo } =
    req.body;

  if (!id || isNaN(id)) {
    return res.status(400).json({ error: "ID inválido." });
  }

  if (!placa || !marca || !modelo || !tipo_veiculo) {
    return res.status(400).json({
      error: "Campos obrigatórios: placa, marca, modelo e tipo_veiculo.",
    });
  }

  const tiposValidos = [
    "frota própria",
    "visitante",
    "colaborador",
    "prestador de serviço",
  ];
  if (!tiposValidos.includes(tipo_veiculo)) {
    return res.status(400).json({ error: "Tipo de veículo inválido." });
  }

  try {
    const veiculoAtualizado = await atualizarVeiculo(id, {
      placa,
      marca,
      modelo,
      tipo_veiculo,
      identificacao_veiculo: identificacao_veiculo || null,
    });

    if (!veiculoAtualizado) {
      return res.status(404).json({ error: "Veículo não encontrado." });
    }

    res.status(200).json({
      message: "Veículo atualizado com sucesso.",
      veiculo: veiculoAtualizado,
    });
  } catch (err) {
    if (err.code === "23505") {
      return res
        .status(409)
        .json({ error: "Placa já está em uso por outro veículo." });
    }

    console.error("Erro ao atualizar veículo:", err);
    res.status(500).json({ error: "Erro ao atualizar veículo." });
  }
}

// DELETE deleta um veículo especifico
async function deletar(req, res) {
  const { id } = req.params;

  if (!id || isNaN(id)) {
    return res.status(400).json({ error: "ID inválido." });
  }

  try {
    const veiculoExcluido = await deletarVeiculo(id);

    if (!veiculoExcluido) {
      return res.status(404).json({ error: "Veículo não encontrado." });
    }

    res.status(200).json({
      message: "Veículo excluído com sucesso.",
      veiculo: veiculoExcluido,
    });
  } catch (err) {
    console.error("Erro ao excluir veículo:", err);
    res.status(500).json({ error: "Erro ao excluir veículo." });
  }
}

module.exports = {
  listar,
  buscarPorId,
  cadastrar,
  atualizar,
  deletar,
};
