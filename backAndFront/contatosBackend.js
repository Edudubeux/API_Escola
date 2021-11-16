var express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
var app = express();

app.use(express.static(__dirname + '/public'));
app.use(bodyParser());

var contatos = [
	{name: "Bruno", phone: "9999-2222", date: new Date(), color: 'green' ,op: {name: "Oi", code: 14, category: "Celular"}},
	{name: "Sandra", phone: "9999-3333", date: new Date(), color: 'blue' ,op: {name: "Vivo", code: 15, category: "Celular"}},
	{name: "Mariana", phone: "9999-9999", date: new Date(), color: 'purple', op: {name: "Tim", code: 41, category: "Celular"}}
];
var operadoras = [
	{name: "Oi", code: 14, category: "Celular", price: 2},
	{name: "Vivo", code: 15, category: "Celular", price: 1},
	{name: "Tim", code: 41, category: "Celular", price: 3},
	{name: "GVT", code: 25, category: "Fixo", price: 1},
	{name: "Embratel", code: 21, category: "Fixo", price: 2}
];
app.use(cors());
app.listen(process.env.PORT || 3412);

app.get('/contatos', function(req, res) {
  res.json(contatos);
});

app.post('/contatos', function(req, res) {
  contatos.push(req.body);
  res.json(true);
});

app.get('/operadoras', function(req, res) {
  res.json(operadoras);
});

