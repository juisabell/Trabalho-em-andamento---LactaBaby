const { Router } = require('express');
const router = Router();

const { storeCadastro } = require('../controller/cadastroController');
const { storeLogin } = require('../controller/loginController');

// processar o login do Banco de Leite Humano (BLH).
const { storeLoginBLH } = require('../controller/loginBLHController');

const { storeForms } = require('../controller/formsController');
const { storeForms2 } = require('../controller/formsController');
const { storeForms3 } = require('../controller/formsController');

const { storePacientes } = require('../controller/pacientesController');

router.post('/store/cadastro', storeCadastro);
router.post('/store/login', storeLogin);

// Define uma rota POST para o caminho /store/loginblh
// Quando o usuário tentar fazer login, essa rota será chamada
router.post('/store/loginblh', storeLoginBLH);


router.post('/store/forms', storeForms);
router.post('/store/forms2', storeForms2);
router.post('/store/forms3', storeForms3);


router.get('/store/pacientes', storePacientes);


// Exporta o router para que ele possa ser usado em outras partes do código
// qualquer código que importar este módulo terá acesso ao router e às rotas 
module.exports = router;


//store: manipulação/armazenamento de dados