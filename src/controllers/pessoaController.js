const { listarPessoas, buscarPessoaPorId } = require("../models/pessoaModel");

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

// GET lista um usuário especifico por id
async function buscarPorId(req, res) {
  const { id } = req.params;

  if (!id || isNaN(id)) {
    return res.status(400).json({ error: "ID inválido." });
  }

  try {
    const pessoa = await buscarPessoaPorId(id);

    if (!pessoa) {
      return res.status(404).json({ error: "Pessoa não encontrada." });
    }

    res.status(200).json({ pessoa });
  } catch (err) {
    console.error("Erro ao buscar pessoa:", err);
    res.status(500).json({ error: "Erro ao buscar pessoa." });
  }
}

module.exports = {
  listar,
  buscarPorId,
};
