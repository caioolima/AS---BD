const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Conectar ao banco de dados MongoDB
mongoose.connect('mongodb+srv://caiolima:caio@as.dg6btws.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Definir o esquema do atleta
const atletaSchema = new mongoose.Schema({
  nome: String,
  idade: Number,
  esporte: String,
  equipe: String
});

const Atleta = mongoose.model('Atleta', atletaSchema);

app.use(bodyParser.json());

// Rota para consultar todos os atletas
app.get('/atletas', async (req, res) => {
  try {
    const atletas = await Atleta.find();
    res.json(atletas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// Rota para criar um atleta
app.post('/atletas', async (req, res) => {
  const atleta = new Atleta({
    nome: req.body.nome,
    idade: req.body.idade,
    esporte: req.body.esporte,
    equipe: req.body.equipe
  });

  try {
    const novoAtleta = await atleta.save();
    res.status(201).json(novoAtleta);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Rota para atualizar um atleta
app.put('/atletas/:id', async (req, res) => {
  try {
    const atletaAtualizado = await Atleta.findByIdAndUpdate(
      req.params.id,
      {
        nome: req.body.nome,
        idade: req.body.idade,
        esporte: req.body.esporte,
        equipe: req.body.equipe
      },
      { new: true }
    );

    if (!atletaAtualizado) {
      return res.status(404).json({ message: 'Atleta não encontrado' });
    }

    res.json(atletaAtualizado);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Rota para remover um atleta
app.delete('/atletas/:id', async (req, res) => {
  try {
    const atletaRemovido = await Atleta.findByIdAndDelete(req.params.id);
    
    if (!atletaRemovido) {
      return res.status(404).json({ message: 'Atleta não encontrado' });
    }

    res.json({ message: 'Atleta removido com sucesso!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor está rodando na porta ${port}`);
});