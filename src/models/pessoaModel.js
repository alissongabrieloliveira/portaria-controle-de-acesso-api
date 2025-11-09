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

module.exports = {
  listarPessoas,
};
