import { Router } from 'express';
import * as oportunidadController from '../controllers/oportunidad.controller.js';

const router = Router();

// Mapeo de las rutas para las oportunidades
// createOportunidad: Crea una nueva oportunidad
router.post('/', oportunidadController.createOportunidad);
// Obtener todas las oportunidades
router.get('/', oportunidadController.getAllOportunidades);
// Obtener una oportunidad por su ID
router.get('/:id', oportunidadController.getOportunidadById);
// Actualizar una oportunidad por su ID
router.put('/:id', oportunidadController.updateOportunidad);
// Eliminar una oportunidad por su ID
router.delete('/:id', oportunidadController.deleteOportunidad);

export default router;