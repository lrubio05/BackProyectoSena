import { Router } from 'express';
import * as canalController from '../controllers/canal.controller.js';

const router = Router();

// Mapeo de las rutas para los canales
// createCanal: Crea un nuevo canal
router.post('/', canalController.createCanal);
// Obtener todos los canales
router.get('/', canalController.getAllCanales);
// Obtener un canal por su ID
router.get('/:id', canalController.getCanalById);
// Actualizar un canal por su ID
router.put('/:id', canalController.updateCanal);
// Eliminar un canal por su ID
router.delete('/:id', canalController.deleteCanal);

export default router;