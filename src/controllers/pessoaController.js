const {
  listarPessoas,
  buscarPessoaPorId,
  cadastrarPessoa,
  atualizarPessoa,
} = require("../models/pessoaModel");

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

// POST cadastra uma nova pessoa
async function cadastrar(req, res) {
  const { nome, sobrenome, cpf, telefone, tipo_pessoa } = req.body;

  if (!nome || !sobrenome || !cpf || !tipo_pessoa) {
    return res.status(400).json({
      error: "Campos obrigatórios: nome, sobrenome, cpf, tipo_pessoa.",
    });
  }

  const tiposValidos = ["colaborador", "visitante", "prestador de serviço"];
  if (!tiposValidos.includes(tipo_pessoa)) {
    return res.status(400).json({ error: "Tipo de pessoa inválido." });
  }

  try {
    const novaPessoa = await cadastrarPessoa({
      nome,
      sobrenome,
      cpf,
      telefone: telefone || null,
      tipo_pessoa,
    });

    res.status(201).json({
      message: "Pessoa cadastrada com sucesso.",
      pessoa: novaPessoa,
    });
  } catch (err) {
    if (err.code === "23505") {
      return res.status(409).json({ error: "CPF já cadastrado." });
    }

    console.error("Erro ao cadastrar pessoa:", err);
    res.status(500).json({ error: "Erro ao cadastrar pessoa." });
  }
}

// PUT atualiza dados de uma pessoa especifica
async function atualizar(req, res) {
  const { id } = req.params;
  const { nome, sobrenome, cpf, telefone, tipo_pessoa } = req.body;

  if (!id || isNaN(id)) {
    return res.status(400).json({ error: "ID inválido." });
  }

  if (!nome || !sobrenome || !cpf || !tipo_pessoa) {
    return res.status(400).json({
      error: "Campos obrigatórios: nome, sobrenome, cpf, tipo_pessoa.",
    });
  }

  const tiposValidos = ["colaborador", "visitante", "prestador de serviço"];
  if (!tiposValidos.includes(tipo_pessoa)) {
    return res.status(400).json({ error: "Tipo de pessoa inválido." });
  }

  try {
    const pessoaAtualizada = await atualizarPessoa(id, {
      nome,
      sobrenome,
      cpf,
      telefone: telefone || null,
      tipo_pessoa,
    });

    if (!pessoaAtualizada) {
      return res.status(404).json({ error: "Pessoa não encontrada." });
    }

    res.status(200).json({
      message: "Pessoa atualizada com sucesso.",
      pessoa: pessoaAtualizada,
    });
  } catch (err) {
    if (err.code === "23505") {
      return res
        .status(409)
        .json({ error: "CPF já cadastrado para outra pessoa." });
    }

    console.error("Erro ao atualizar pessoa:", err);
    res.status(500).json({ error: "Erro ao atualizar pessoa." });
  }
}

module.exports = {
  listar,
  buscarPorId,
  cadastrar,
  atualizar,
};
