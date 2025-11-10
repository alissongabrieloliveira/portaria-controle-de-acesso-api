const db = require("../config/db");

// Lista todas as movimentações da frota
async function listarMovimentacoesFrota() {
  const query = `
    SELECT cf.*,
           u1.nome AS usuario_entrada_nome,
           u2.nome AS usuario_saida_nome,
           v.placa AS placa_veiculo,
           c.nome AS cidade_destino,
           c.estado,
           p.nome AS posto
    FROM controle_frota cf
    LEFT JOIN usuarios u1 ON u1.id = cf.id_usuario_entrada
    LEFT JOIN usuarios u2 ON u2.id = cf.id_usuario_saida
    LEFT JOIN veiculos v ON v.id = cf.id_veiculo
    LEFT JOIN cidades c ON c.id = cf.id_cidade_destino
    LEFT JOIN posto_controle p ON p.id = cf.id_posto_controle
    ORDER BY cf.data_hora_entrada DESC;
  `;

  try {
    const { rows } = await db.query(query);
    return rows;
  } catch (error) {
    throw error;
  }
}

// Lista uma movimentação especifica da frota propria por id
async function buscarMovimentacaoFrotaPorId(id) {
  const query = `
    SELECT cf.*,
           u1.nome AS usuario_entrada_nome,
           u2.nome AS usuario_saida_nome,
           v.placa AS placa_veiculo,
           c.nome AS cidade_destino,
           c.estado,
           p.nome AS posto
    FROM controle_frota cf
    LEFT JOIN usuarios u1 ON u1.id = cf.id_usuario_entrada
    LEFT JOIN usuarios u2 ON u2.id = cf.id_usuario_saida
    LEFT JOIN veiculos v ON v.id = cf.id_veiculo
    LEFT JOIN cidades c ON c.id = cf.id_cidade_destino
    LEFT JOIN posto_controle p ON p.id = cf.id_posto_controle
    WHERE cf.id = $1;
  `;

  try {
    const { rows } = await db.query(query, [id]);
    return rows[0]; // undefined se não encontrado
  } catch (error) {
    throw error;
  }
}

// Registra uma nova entrada da frota
async function registrarEntradaFrota({
  km_inicial,
  id_usuario_entrada,
  id_posto_controle,
  id_veiculo,
  id_cidade_destino,
  motivo,
}) {
  const query = `
    INSERT INTO controle_frota (
      km_inicial,
      id_usuario_entrada,
      id_posto_controle,
      id_veiculo,
      id_cidade_destino,
      motivo
    ) VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
  `;

  const values = [
    km_inicial,
    id_usuario_entrada,
    id_posto_controle,
    id_veiculo,
    id_cidade_destino,
    motivo || null,
  ];

  try {
    const { rows } = await db.query(query, values);
    return rows[0];
  } catch (error) {
    throw error;
  }
}

module.exports = {
  listarMovimentacoesFrota,
  buscarMovimentacaoFrotaPorId,
  registrarEntradaFrota,
};
