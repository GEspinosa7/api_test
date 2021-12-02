const { Router } = require('express');
const express = require('express');
const { criaPersonagem, atualizaPersonagem, listaPersonagens, obterPersonagem, deletaPersonagem } = require('./controllers/personagens');

const router = express();

router.post('/criarPersonagem', criaPersonagem);
router.get('/listarPersonagens', listaPersonagens);
router.get('/obterPersonagem/:id', obterPersonagem);
router.put('/atualizarPersonagem/:id', atualizaPersonagem);
router.delete('/deletarPersonagem/:id', deletaPersonagem);

module.exports = router;