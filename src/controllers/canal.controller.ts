import type { Request, Response } from 'express';
import * as canalService from '../services/canal.service.js';

// --- OBTENER TODOS los canales ---
export const getAllCanales = async (req: Request, res: Response) => {
  try {
    const canales = await canalService.getAll();
    res.status(200).json(canales);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// --- OBTENER UN canal por ID ---
export const getCanalById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: 'Se requiere un ID de canal' });
    }
    const canal = await canalService.getById(id);
    res.status(200).json(canal);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

// --- CREAR un nuevo canal ---
export const createCanal = async (req: Request, res: Response) => {
  try {
    const nuevoCanal = await canalService.create(req.body);
    res.status(201).json(nuevoCanal);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// --- ACTUALIZAR un canal ---
export const updateCanal = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: 'Se requiere un ID de canal' });
    }
    const canal = await canalService.update(id, req.body);
    res.status(200).json(canal);
  } catch (error: any) {
    res.status(500).json({ message: 'Error al actualizar el canal', error: error.message });
  }
};

// --- ELIMINAR un canal ---
export const deleteCanal = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: 'Se requiere un ID de canal' });
    }
    await canalService.remove(id);
    res.status(204).send(); // 204 No Content: Éxito sin devolver contenido
  } catch (error: any) {
    res.status(500).json({ message: 'Error al eliminar el canal', error: error.message });
  }
};