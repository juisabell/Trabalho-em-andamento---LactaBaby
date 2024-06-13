const { Router } = require('express');
const router = Router();

const { storeCadastro } = require('../controller/cadastroController');
const { storeLogin } = require('../controller/loginController');
const { storeForms } = require('../controller/formsController');

router.post('/store/cadastro', storeCadastro);
router.post('/store/login', storeLogin);
router.post('/store/forms', storeForms);

module.exports = router;