import type { Request, Response } from 'express';
import * as homologacionService from '../services/homologacion.service.js';

// --- OBTENER TODOS las homologaciones ---
export const getAllHomologaciones = async (req: Request, res: Response) => {
  try {
    const homologaciones = await homologacionService.getAll();
    res.status(200).json(homologaciones);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
// --- OBTENER UNA homologación por ID ---
export const getHomologacionById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: 'Se requiere un ID de homologación' });
    }
    const homologacion = await homologacionService.getById(id);
    res.status(200).json(homologacion);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

// --- CREAR una nueva homologación ---
export const createHomologacion = async (req: Request, res: Response) => {
  try {
    const nuevaHomologacion = await homologacionService.create(req.body);
    res.status(201).json(nuevaHomologacion);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
// --- ACTUALIZAR una homologación ---
export const updateHomologacion = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: 'Se requiere un ID de homologación' });
    }
    const homologacion = await homologacionService.update(id, req.body);
    res.status(200).json(homologacion);
  } catch (error: any) {
    res.status(500).json({ message: 'Error al actualizar la homologación', error: error.message });
  }
};

// --- ELIMINAR una homologación ---
export const deleteHomologacion = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: 'Se requiere un ID de homologación' });
    }
    await homologacionService.remove(id);
    res.status(204).send(); // 204 No Content: Éxito sin devolver contenido
  } catch (error: any) {
    res.status(500).json({ message: 'Error al eliminar la homologación', error: error.message });
  }
};