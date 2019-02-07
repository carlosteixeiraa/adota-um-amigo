var express = require('express');
var mongoose = require('mongoose');
var app = express();
var porta = 3000;
var tag = '<b style="font-size: 22px;">Adota um amigo</b><br>';

mongoose.connect('mongodb://localhost:27017/adota-um-amigo');

var Gato = mongoose.model('Gatos', new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    telemovel: {
        type: Number,
        required: true
    },
    sexo: {
        type: String,
        required: true
    },
    idade: {
        type: String,
        required: true
    },
    raca: {
        type: String,
        required: true 
    },
    bio: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        required: true
    }
})); 

var Cao = mongoose.model('Caes', new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    telemovel: {
        type: Number,
        required: true
    },
    sexo: {
        type: String,
        required: true
    },
    idade: {
        type: String,
        required: true
    },
    raca: {
        type: String,
        required: true 
    },
    bio: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        required: true
    }
})); 


app.set('view engine', 'pug');

app.get('/api/', (req, res) => {
    res.send(tag + 'API a funcionar');
});

app.get('/api/add/gatos', (req, res) => {
    
    var nome = req.query.nome;
    var telemovel = req.query.telemovel;
    var sexo = req.query.sexo;
    var idade = req.query.idade;
    var raca = req.query.raca;
    var bio = req.query.bio;
    var likes = req.query.likes;

    if(nome && sexo && idade && raca && bio && likes) {
        
        var novoGato = {
            nome: nome,
            telemovel: telemovel,
            sexo: sexo,
            idade: idade,
            raca: raca,
            bio: bio,
            likes: likes
        }

        var addGato = new Gato(novoGato);

        addGato.save((erro) => {
            if(erro) {
                res.send(tag + '/api/add/gato - bad request');
            } else {
                res.send(tag + '/api/add/gato - gato adicionado com sucesso!');
            }
        })


    } else {
        res.send(tag + '/api/add/gatos - bad request');
    }

});

app.get('/api/read/gatos', (req, res) => {
    
    Gato.find({}, (erro, resposta) => {
    
        if(erro) {
            res.send(tag + '/api/read/gatos - bad request');
        } else {
            res.send(tag + resposta);
        }
    
    });

});

app.get('/api/add/caes', (req, res) => {
    
    var nome = req.query.nome;
    var telemovel = req.query.telemovel;
    var sexo = req.query.sexo;
    var idade = req.query.idade;
    var raca = req.query.raca;
    var bio = req.query.bio;
    var likes = req.query.likes;

    if(nome && sexo && idade && raca && bio && likes) {
        
        var novoCao = {
            nome: nome,
            telemovel: telemovel,
            sexo: sexo,
            idade: idade,
            raca: raca,
            bio: bio,
            likes: likes
        }

        var addCao = new Cao(novoCao);

        addCao.save((erro) => {
            if(erro) {
                res.send(tag + '/api/add/caes - bad request');
            } else {
                res.send(tag + '/api/add/caes - cao adicionado com sucesso!');
            }
        })


    } else {
        res.send(tag + '/api/add/caes - bad request');
    }

});

app.get('/api/read/caes', (req, res) => {
    
    Cao.find({}, (erro, resposta) => {
    
        if(erro) {
            res.send(tag + '/api/read/caes - bad request');
        } else {
            res.send(tag + resposta);
        }
    
    });

});

app.listen(porta, () => {
    console.log('API a correr na porta - ' + porta);
})