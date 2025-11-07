const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  registrarUsuario,
  buscarUsuarioPorUsername,
} = require("../models/usuarioModel");

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

// POST login de usuário
async function login(req, res) {
  const { usuario, senha } = req.body;

  if (!usuario || !senha) {
    return res.status(400).json({ error: "Usuário e senha são obrigatórios." });
  }

  try {
    const usuarioEncontrado = await buscarUsuarioPorUsername(usuario);

    if (!usuarioEncontrado) {
      return res.status(401).json({ error: "Credenciais inválidas." });
    }

    const senhaConfere = await bcrypt.compare(senha, usuarioEncontrado.senha);

    if (!senhaConfere) {
      return res.status(401).json({ error: "Credenciais inválidas." });
    }

    if (!usuarioEncontrado.usuario_ativo) {
      return res.status(403).json({ error: "Usuário inativo." });
    }

    const token = jwt.sign(
      {
        id: usuarioEncontrado.id,
        usuario: usuarioEncontrado.usuario,
        tipo_usuario: usuarioEncontrado.tipo_usuario,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN || "8h",
      }
    );

    res.status(200).json({
      message: "Login realizado com sucesso.",
      token,
    });
  } catch (err) {
    console.error("Erro no login:", err);
    res.status(500).json({ error: "Erro interno no servidor." });
  }
}

module.exports = {
  registrar,
  login,
};
