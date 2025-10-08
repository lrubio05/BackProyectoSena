import { Router } from 'express';
import * as homologacionController from '../controllers/homologacion.controller.js';

const router = Router();

// Mapeo de las rutas para las homologaciones
// createHomologacion: Crea una nueva homologación
router.post('/', homologacionController.createHomologacion);
// Obtener todas las homologaciones
router.get('/', homologacionController.getAllHomologaciones);
// Obtener una homologación por su ID
router.get('/:id', homologacionController.getHomologacionById);
// Actualizar una homologación por su ID
router.put('/:id', homologacionController.updateHomologacion);
// Eliminar una homologación por su ID
router.delete('/:id', homologacionController.deleteHomologacion);

export default router;