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

// Cadastro um novo veículo
async function cadastrarVeiculo({
  placa,
  marca,
  modelo,
  tipo_veiculo,
  identificacao_veiculo,
}) {
  const query = `
    INSERT INTO veiculos (placa, marca, modelo, tipo_veiculo, identificacao_veiculo)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `;
  const values = [placa, marca, modelo, tipo_veiculo, identificacao_veiculo];

  try {
    const { rows } = await db.query(query, values);
    return rows[0];
  } catch (error) {
    throw error;
  }
}

// Atualiza dados de um veículo existente
async function atualizarVeiculo(
  id,
  { placa, marca, modelo, tipo_veiculo, identificacao_veiculo }
) {
  const query = `
    UPDATE veiculos
    SET placa = $1,
        marca = $2,
        modelo = $3,
        tipo_veiculo = $4,
        identificacao_veiculo = $5
    WHERE id = $6
    RETURNING *;
  `;
  const values = [
    placa,
    marca,
    modelo,
    tipo_veiculo,
    identificacao_veiculo,
    id,
  ];

  try {
    const { rows } = await db.query(query, values);
    return rows[0]; // pode retornar undefined
  } catch (error) {
    throw error;
  }
}

// Deleta um veículo especifico
async function deletarVeiculo(id) {
  const query = `DELETE FROM veiculos WHERE id = $1 RETURNING *`;
  const values = [id];

  try {
    const { rows } = await db.query(query, values);
    return rows[0]; // se existir, retorna o veículo excluído
  } catch (error) {
    throw error;
  }
}

module.exports = {
  listarVeiculos,
  buscarVeiculoPorId,
  cadastrarVeiculo,
  atualizarVeiculo,
  deletarVeiculo,
};
