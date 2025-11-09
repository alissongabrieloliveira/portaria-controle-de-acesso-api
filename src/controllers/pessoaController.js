const { listarPessoas } = require("../models/pessoaModel");

// GET lista todas as pessoas
async function listar(req, res) {
  try {
    const pessoas = await listarPessoas();
    res.status(200).json({ pessoas });
  } catch (err) {
    console.error("Erro ao listar pessoas:", err);
    res.status(500).json({ error: "Erro ao buscar pessoas." });
  }
}

module.exports = {
  listar,
};
