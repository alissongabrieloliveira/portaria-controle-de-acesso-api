const db = require("../config/db");

// Lista todas as pessoas
async function listarPessoas() {
  const query = `SELECT * FROM pessoas ORDER BY criado_em DESC`;

  try {
    const { rows } = await db.query(query);
    return rows;
  } catch (error) {
    throw error;
  }
}

// Lista um usuário especifico por id
async function buscarPessoaPorId(id) {
  const query = `SELECT * FROM pessoas WHERE id = $1`;
  const values = [id];

  try {
    const { rows } = await db.query(query, values);
    return rows[0]; // undefined se não encontrado
  } catch (error) {
    throw error;
  }
}

module.exports = {
  listarPessoas,
  buscarPessoaPorId,
};
