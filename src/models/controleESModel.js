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

module.exports = {
  listarMovimentacoes,
};
