const db = require("../config/db");

// Lista todos os veículos
async function listarVeiculos() {
  const query = `SELECT * FROM veiculos ORDER BY criado_em DESC`;

  try {
    const { rows } = await db.query(query);
    return rows;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  listarVeiculos,
};
