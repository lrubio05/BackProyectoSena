import { Router } from 'express';
import * as eventoController from '../controllers/evento.controller.js';

const router = Router();

// Mapeo de las rutas para los eventos
// createEvento: Crea un nuevo evento
router.post('/', eventoController.createEvento);
// Obtener todos los eventos
router.get('/', eventoController.getAllEventos);
// Obtener un evento por su ID
router.get('/:id', eventoController.getEventoById);
// Actualizar un evento por su ID
router.put('/:id', eventoController.updateEvento);
// Eliminar un evento por su ID
router.delete('/:id', eventoController.deleteEvento);

export default router;