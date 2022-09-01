const express = require('express');//Set up the express module
const app = express();
const path = require('path')//Include the Path module
const router = express.Router();

const pug = require('pug');

const Database = require("@replit/database")
const db = new Database()

app.use(express.static(path.join(__dirname, 'public')));

router.get('/', async (req, res) => {
	res.render(path.join(__dirname, 'index.html'));
});
app.use('/', router);

router.get('/api', async (req, res) => {
	let data = {
		'kalebe': {
			'sustos_dados': await db.get("kalebe_sustos_tomados"),
			'sustos_dados': await db.get("kalebe_sustos_dados"),
		},
		'pedro': {
			'sustos_dados': await db.get("pedro_sustos_tomados"),
			'sustos_dados': await db.get("pedro_sustos_dados"),
		},
		'aderson': {
			'sustos_dados': await db.get("aderson_sustos_tomados"),
			'sustos_dados': await db.get("aderson_sustos_dados"),
		},
	};

    res.json(data);
	
});

router.delete('/api', async (req, res) => {
	
	db.delete("kalebel_sustos_dados").then(() => {});

    res.json(data);
})

router.post('/api/:nome/:dado_tomado', async (req, res) => {
	if (req.params.dado_tomado) {
		let numero = await db.get(`${req.params.nome}_sustos_dados`) ?? 0;
		let insert = await db.set(`${req.params.nome}_sustos_dados`, '++numero');
	} else {
		let numero = await db.get(`${req.params.nome}_sustos_tomados`) ?? 0;
		let insert = await db.set(`${req.params.nome}_sustos_tomados`, ++numero);
	}

    res.json({"sucesso": true});
});
app.use('/api', router);

router.get('/api_all', async (req, res) => {
	let data = await db.list();

    res.json(data);
});
app.use('/api_all', router);

let server = app.listen(3000, () => {
  console.log("App server is running on port 3000");
});