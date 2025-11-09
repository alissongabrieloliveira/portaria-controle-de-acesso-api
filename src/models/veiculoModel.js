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

// Lista um veículo especifico por id
async function buscarVeiculoPorId(id) {
  const query = `SELECT * FROM veiculos WHERE id = $1`;
  const values = [id];

  try {
    const { rows } = await db.query(query, values);
    return rows[0]; // pode retornar undefined
  } catch (error) {
    throw error;
  }
}

module.exports = {
  listarVeiculos,
  buscarVeiculoPorId,
};
