const db = require("../config/db");

// Registra um novo usuário
async function registrarUsuario({
  nome,
  sobrenome,
  usuario,
  cpf,
  tipo_usuario,
  senha,
}) {
  const query = `
    INSERT INTO usuarios (nome, sobrenome, usuario, cpf, tipo_usuario, senha)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING id, nome, sobrenome, usuario, cpf, tipo_usuario, criado_em, usuario_ativo;
  `;
  const values = [nome, sobrenome, usuario, cpf, tipo_usuario, senha];

  try {
    const { rows } = await db.query(query, values);
    return rows[0];
  } catch (error) {
    throw error;
  }
}

module.exports = {
  registrarUsuario,
};
