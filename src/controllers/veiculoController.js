const {
  listarVeiculos,
  buscarVeiculoPorId,
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

module.exports = {
  listar,
  buscarPorId,
};
