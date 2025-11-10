const db = require("../config/db");

// Lista todas as movimentações da frota
async function listarMovimentacoesFrota() {
  const queryMovimentacoes = `
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

  const queryPessoas = `
    SELECT cfp.id_controle_frota, pes.*
    FROM controle_frota_pessoas cfp
    JOIN pessoas pes ON pes.id = cfp.id_pessoa;
  `;

  try {
    const { rows: movimentacoes } = await db.query(queryMovimentacoes);
    const { rows: pessoasAssociadas } = await db.query(queryPessoas);

    // Agrupar pessoas por id_controle_frota
    const pessoasMap = {};
    pessoasAssociadas.forEach((p) => {
      if (!pessoasMap[p.id_controle_frota]) {
        pessoasMap[p.id_controle_frota] = [];
      }
      pessoasMap[p.id_controle_frota].push({
        id: p.id,
        nome: p.nome,
        sobrenome: p.sobrenome,
        cpf: p.cpf,
        telefone: p.telefone,
        tipo_pessoa: p.tipo_pessoa,
        criado_em: p.criado_em,
      });
    });

    // Adiciona array de pessoas a cada movimentação
    return movimentacoes.map((mov) => ({
      ...mov,
      pessoas: pessoasMap[mov.id] || [],
    }));
  } catch (error) {
    throw error;
  }
}

// Lista uma movimentação especifica da frota propria por id
async function buscarMovimentacaoFrotaPorId(id) {
  const queryMov = `
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

  const queryPessoas = `
    SELECT pes.*
    FROM controle_frota_pessoas cfp
    JOIN pessoas pes ON pes.id = cfp.id_pessoa
    WHERE cfp.id_controle_frota = $1;
  `;

  try {
    const { rows } = await db.query(queryMov, [id]);
    if (rows.length === 0) return undefined;

    const movimentacao = rows[0];
    const { rows: pessoas } = await db.query(queryPessoas, [id]);

    return {
      ...movimentacao,
      pessoas,
    };
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

// Criar associação de pessoas na frota
async function associarPessoasNaFrota(id_controle_frota, id_pessoas = []) {
  if (!id_pessoas.length) return;

  const query = `
    INSERT INTO controle_frota_pessoas (id_controle_frota, id_pessoa)
    VALUES ${id_pessoas.map((_, i) => `($1, $${i + 2})`).join(", ")};
  `;

  const values = [id_controle_frota, ...id_pessoas];

  try {
    await db.query(query, values);
  } catch (error) {
    throw error;
  }
}

// Registra um movimentação de saída da frota
async function registrarSaidaFrota({
  id,
  km_final,
  id_usuario_saida,
  id_cidade_destino,
}) {
  const query = `
    UPDATE controle_frota
    SET
      km_final = $1,
      data_hora_saida = CURRENT_TIMESTAMP,
      id_usuario_saida = $2,
      id_cidade_destino = $3
    WHERE id = $4
    RETURNING *;
  `;

  const values = [km_final, id_usuario_saida, id_cidade_destino, id];

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
  associarPessoasNaFrota,
  registrarSaidaFrota,
};
