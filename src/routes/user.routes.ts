import { Router } from 'express';
import * as userController from '../controllers/user.controller.js'; // Importación del controlador

const router = Router();

// Mapeo de tus rutas a un estilo RESTful
// Sintaxis: router.método('ruta', controlador.función);

// Ruta /registrar
router.post('/register', userController.registerUser);
// Ruta /ingreso
router.post('/login', userController.loginUser);
// Ruta /consultar
router.get('/', userController.getAllUsers);
// Ruta /buscarusuario
router.get('/:id', userController.getUserById);
// Ruta /editarusuario
router.put('/:id', userController.updateUser);
// Ruta /eliminarusuario
router.delete('/:id', userController.deleteUser);

export default router;