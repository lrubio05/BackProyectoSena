import type { Request, Response } from 'express';
import * as eventoService from '../services/evento.service.js';

// --- OBTENER TODOS los eventos ---
export const getAllEventos = async (req: Request, res: Response) => {
  try {
    const eventos = await eventoService.getAll();
    res.status(200).json(eventos);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// --- OBTENER UN evento por ID ---
export const getEventoById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: 'Se requiere un ID de evento' });
    }
    const evento = await eventoService.getById(id);
    res.status(200).json(evento);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

// --- CREAR un nuevo evento ---
export const createEvento = async (req: Request, res: Response) => {
  try {
    const nuevoEvento = await eventoService.create(req.body);
    res.status(201).json(nuevoEvento);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// --- ACTUALIZAR un evento ---
export const updateEvento = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: 'Se requiere un ID de evento' });
    }
    const evento = await eventoService.update(id, req.body);
    res.status(200).json(evento);
  } catch (error: any) {
    res.status(500).json({ message: 'Error al actualizar el evento', error: error.message });
  }
};

// --- ELIMINAR un evento ---
export const deleteEvento = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: 'Se requiere un ID de evento' });
    }
    await eventoService.remove(id);
    res.status(204).send(); // 204 No Content: Éxito sin devolver contenido
  } catch (error: any) {
    res.status(500).json({ message: 'Error al eliminar el evento', error: error.message });
  }
};