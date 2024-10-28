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


/**
 * @swagger
 * /store/cadastro:
 *   post:
 *     summary: Cadastrar novo usuário
 *     description: Endpoint para cadastrar um novo usuário no sistema.
 *     responses:
 *       200:
 *         description: Usuário cadastrado com sucesso.
 */
router.post('/store/cadastro', storeCadastro);

/**
 * @swagger
 * /store/login:
 *   post:
 *     summary: Fazer login no sistema
 *     description: Endpoint para realizar login de um usuário.
 *     responses:
 *       200:
 *         description: Login realizado com sucesso.
 */
router.post('/store/login', storeLogin);


// Define uma rota POST para o caminho /store/loginblh
// Quando o usuário tentar fazer login, essa rota será chamada
/**
 * @swagger
 * /store/loginblh:
 *   post:
 *     summary: Fazer login no Banco de Leite Humano (BLH)
 *     description: Endpoint para realizar login de um BLH no sistema.
 *     responses:
 *       200:
 *         description: Login BLH realizado com sucesso.
 */
router.post('/store/loginblh', storeLoginBLH);

/**
 * @swagger
 * /store/forms:
 *   post:
 *     summary: Submeter formulário
 *     description: Endpoint para submeter o primeiro formulário.
 *     responses:
 *       200:
 *         description: Formulário submetido com sucesso.
 */
router.post('/store/forms', storeForms);

/**
 * @swagger
 * /store/forms2:
 *   post:
 *     summary: Submeter formulário 2
 *     description: Endpoint para submeter o segundo formulário.
 *     responses:
 *       200:
 *         description: Formulário 2 submetido com sucesso.
 */

router.post('/store/forms2', storeForms2);

/**
 * @swagger
 * /store/forms3:
 *   post:
 *     summary: Submeter formulário 3
 *     description: Endpoint para submeter o terceiro formulário.
 *     responses:
 *       200:
 *         description: Formulário 3 submetido com sucesso.
 */
router.post('/store/forms3', storeForms3);

/**
 * @swagger
 * /store/pacientes:
 *   get:
 *     summary: Obter lista de pacientes
 *     description: Endpoint para obter a lista de pacientes cadastrados.
 *     responses:
 *       200:
 *         description: Lista de pacientes obtida com sucesso.
 */
router.get('/store/pacientes', storePacientes);


// Exporta o router para que ele possa ser usado em outras partes do código
// qualquer código que importar este módulo terá acesso ao router e às rotas 
module.exports = router;


//store: manipulação/armazenamento de dados