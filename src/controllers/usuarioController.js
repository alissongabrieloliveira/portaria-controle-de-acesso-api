const bcrypt = require("bcrypt");
const { registrarUsuario } = require("../models/usuarioModel");

// POST registra um novo usuário
async function registrar(req, res) {
  const { nome, sobrenome, usuario, cpf, tipo_usuario, senha } = req.body;

  if (!nome || !sobrenome || !usuario || !cpf || !tipo_usuario || !senha) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios." });
  }

  if (!["admin", "porteiro"].includes(tipo_usuario)) {
    return res.status(400).json({ error: "Tipo de usuário inválido." });
  }

  try {
    const saltRounds = 10;
    const senhaHash = await bcrypt.hash(senha, saltRounds);

    const novoUsuario = await registrarUsuario({
      nome,
      sobrenome,
      usuario,
      cpf,
      tipo_usuario,
      senha: senhaHash,
    });

    res.status(201).json({
      message: "Usuário registrado com sucesso.",
      usuario: novoUsuario,
    });
  } catch (err) {
    if (err.code === "23505") {
      return res.status(409).json({ error: "Usuário ou CPF já cadastrado." });
    }

    console.error(err);
    res.status(500).json({ error: "Erro ao registrar usuário." });
  }
}

module.exports = {
  registrar,
};
