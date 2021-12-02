const knex = require('../database/conexao');
const { schemaCriarPersonagem, schemaAtualizarPersonagem } = require("../validations/schemas/schemaPersonagem");

const criaPersonagem = async (req, res) => {
  const { nome, raca } = req.body;

  try {
    await schemaCriarPersonagem.validate(req.body);

    const data = { nome, raca }

    const novoPersonagem = await knex('personagens').insert(data).returning('*');
    if (novoPersonagem.rowCount === 0) return res.status(400).json({ erro: 'Não foi possível criar este personagem, tente novamente' });

    return res.status(200).json(novoPersonagem);
  } catch (error) {
    return res.status(400).json({ erro: error.message });
  }
}

const atualizaPersonagem = async (req, res) => {
  const { id } = req.params;
  const { nome, raca } = req.body;

  try {
    await schemaAtualizarPersonagem.validate(req.body);

    const personagem = await knex('personagens').where({ id }).first();
    if (!personagem) return res.status(404).json({ erro: "Personagem não econtrado" });

    const novosDados = { nome, raca };

    const personagemAtualizado = await knex('personagens').update(novosDados).where({ id }).returning('*');
    if (personagemAtualizado.rowCount === 0) return res.status(400).json({ erro: "Não foi possível atualizar este personagem, tente novamente" });

    return res.status(200).json(personagemAtualizado[0]);
  } catch (error) {
    return res.status(400).json({ erro: error.message });
  }
};


const listaPersonagens = async (req, res) => {
  try {
    const personagens = await knex('personagens');

    return res.status(200).json(personagens);
  } catch (error) {
    return res.status(400).json({ erro: error.message });
  }
}

const obterPersonagem = async (req, res) => {
  const { id } = req.params;

  try {
    const personagem = await knex('personagens').where({ id }).first();
    if (!personagem) return res.status(404).json({ erro: "Este personagem não foi encontrado" });

    return res.status(200).json(personagem);
  } catch (error) {
    return res.status(400).json({ erro: error.message });
  }
}

const deletaPersonagem = async (req, res) => {
  const { id } = req.params;

  try {
    const personagem = await knex('personagens').where({ id }).first();
    if (!personagem) return res.status(404).json({ erro: "Este personagem não foi encontrado" });

    const { rowCount } = await knex('personagens').del().where({ id });
    if (rowCount === 0) return res.status(400).json({ erro: "Não foi possível deletar este personagem, tente novamente" });

    return res.status(200).json({ sucesso: "Personagem excluído com sucesso!" });
  } catch (error) {
    return res.status(400).json({ erro: error.message });
  }

}

module.exports = {
  criaPersonagem,
  atualizaPersonagem,
  deletaPersonagem,
  listaPersonagens,
  obterPersonagem
}