const { Router } = require('express');
const router = Router();

const { storeCadastro } = require('../controller/cadastroController');
const { storeLogin } = require('../controller/loginController');
const { storeForms } = require('../controller/formsController');
const { storeForms2 } = require('../controller/formsController');
const { storeForms3 } = require('../controller/formsController');

router.post('/store/cadastro', storeCadastro);
router.post('/store/login', storeLogin);
router.post('/store/forms', storeForms);
router.post('/store/forms2', storeForms2);
router.post('/store/forms3', storeForms3);

module.exports = router;