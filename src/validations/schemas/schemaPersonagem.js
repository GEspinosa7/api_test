const yup = require('../config');

const schemaCriarPersonagem = yup.object().shape({
  nome: yup.string().required(),
  raca: yup.string().required()
});

const schemaAtualizarPersonagem = yup.object().shape({
  nome: yup.string().matches(/^[aA-zZ\s]+$/, "Apenas caracteres válidos"),
  raca: yup.string().matches(/^[aA-zZ\s]+$/, "Apenas caracteres válidos")
});

module.exports = {
  schemaCriarPersonagem,
  schemaAtualizarPersonagem
};