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

// Cadastra uma nova pessoa
async function cadastrarPessoa({
  nome,
  sobrenome,
  cpf,
  telefone,
  tipo_pessoa,
}) {
  const query = `
    INSERT INTO pessoas (nome, sobrenome, cpf, telefone, tipo_pessoa)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `;
  const values = [nome, sobrenome, cpf, telefone, tipo_pessoa];

  try {
    const { rows } = await db.query(query, values);
    return rows[0];
  } catch (error) {
    throw error;
  }
}

// Atualiza dados de uma pessoa especifico
async function atualizarPessoa(
  id,
  { nome, sobrenome, cpf, telefone, tipo_pessoa }
) {
  const query = `
    UPDATE pessoas
    SET nome = $1,
        sobrenome = $2,
        cpf = $3,
        telefone = $4,
        tipo_pessoa = $5
    WHERE id = $6
    RETURNING *;
  `;
  const values = [nome, sobrenome, cpf, telefone, tipo_pessoa, id];

  try {
    const { rows } = await db.query(query, values);
    return rows[0]; // undefined se não encontrada
  } catch (error) {
    throw error;
  }
}

// Delata uma pessoa especifica
async function deletarPessoa(id) {
  const query = `DELETE FROM pessoas WHERE id = $1 RETURNING *`;
  const values = [id];

  try {
    const { rows } = await db.query(query, values);
    return rows[0]; // se não existir, retorna undefined
  } catch (error) {
    throw error;
  }
}

module.exports = {
  listarPessoas,
  buscarPessoaPorId,
  cadastrarPessoa,
  atualizarPessoa,
  deletarPessoa,
};
