const db = require("../config/db");

// Lista todas as movimentações
async function listarMovimentacoes() {
  const query = `
    SELECT ces.*, 
           u1.nome AS usuario_entrada_nome,
           u2.nome AS usuario_saida_nome,
           v.placa AS placa_veiculo,
           s.nome AS setor_visitado,
           p.nome AS posto
    FROM controle_entradas_saidas ces
    LEFT JOIN usuarios u1 ON u1.id = ces.id_usuario_entrada
    LEFT JOIN usuarios u2 ON u2.id = ces.id_usuario_saida
    LEFT JOIN veiculos v ON v.id = ces.id_veiculo
    LEFT JOIN setores s ON s.id = ces.id_setor_visitado
    LEFT JOIN posto_controle p ON p.id = ces.id_posto_controle
    ORDER BY ces.data_hora_entrada DESC;
  `;

  try {
    const { rows } = await db.query(query);
    return rows;
  } catch (error) {
    throw error;
  }
}

// Lista uma movimentação especifica por id
async function buscarEntradaPorId(id) {
  const query = `
    SELECT ces.*, 
           u1.nome AS usuario_entrada_nome,
           u2.nome AS usuario_saida_nome,
           v.placa AS placa_veiculo,
           s.nome AS setor_visitado,
           p.nome AS posto
    FROM controle_entradas_saidas ces
    LEFT JOIN usuarios u1 ON u1.id = ces.id_usuario_entrada
    LEFT JOIN usuarios u2 ON u2.id = ces.id_usuario_saida
    LEFT JOIN veiculos v ON v.id = ces.id_veiculo
    LEFT JOIN setores s ON s.id = ces.id_setor_visitado
    LEFT JOIN posto_controle p ON p.id = ces.id_posto_controle
    WHERE ces.id = $1;
  `;

  try {
    const { rows } = await db.query(query, [id]);
    return rows[0];
  } catch (error) {
    throw error;
  }
}

// Registra uma nova entrada
async function registrarEntrada({
  km_inicial,
  id_usuario_entrada,
  id_posto_controle,
  id_veiculo,
  id_setor_visitado,
  motivo,
}) {
  const query = `
    INSERT INTO controle_entradas_saidas (
      km_inicial,
      id_usuario_entrada,
      id_posto_controle,
      id_veiculo,
      id_setor_visitado,
      motivo
    ) VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
  `;
  const values = [
    km_inicial || null,
    id_usuario_entrada,
    id_posto_controle,
    id_veiculo || null,
    id_setor_visitado,
    motivo || null,
  ];

  try {
    const { rows } = await db.query(query, values);
    return rows[0];
  } catch (error) {
    throw error;
  }
}

// Registra a saída de uma entrada especifica por id
async function registrarSaida(id, { km_final, id_usuario_saida }) {
  const query = `
    UPDATE controle_entradas_saidas
    SET
      km_final = $1,
      data_hora_saida = CURRENT_TIMESTAMP,
      id_usuario_saida = $2
    WHERE id = $3
    RETURNING *;
  `;
  const values = [km_final || null, id_usuario_saida, id];

  try {
    const { rows } = await db.query(query, values);
    return rows[0];
  } catch (error) {
    throw error;
  }
}

module.exports = {
  listarMovimentacoes,
  buscarEntradaPorId,
  registrarEntrada,
  registrarSaida,
};
