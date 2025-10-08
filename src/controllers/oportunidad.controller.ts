import type { Request, Response } from 'express';
import * as oportunidadService from '../services/oportunidad.service.js';

// --- OBTENER TODOS las oportunidades ---
export const getAllOportunidades = async (req: Request, res: Response) => {
  try {
    const oportunidades = await oportunidadService.getAll();
    res.status(200).json(oportunidades);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
// --- OBTENER UNA oportunidad por ID ---
export const getOportunidadById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: 'Se requiere un ID de oportunidad' });
    }
    const oportunidad = await oportunidadService.getById(id);
    res.status(200).json(oportunidad);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

// --- CREAR una nueva oportunidad ---
export const createOportunidad = async (req: Request, res: Response) => {
  try {
    const nuevaOportunidad = await oportunidadService.create(req.body);
    res.status(201).json(nuevaOportunidad);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
// --- ACTUALIZAR una oportunidad ---
export const updateOportunidad = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: 'Se requiere un ID de oportunidad' });
    }
    const oportunidad = await oportunidadService.update(id, req.body);
    res.status(200).json(oportunidad);
  } catch (error: any) {
    res.status(500).json({ message: 'Error al actualizar la oportunidad', error: error.message });
  }
};

// --- ELIMINAR una oportunidad ---
export const deleteOportunidad = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: 'Se requiere un ID de oportunidad' });
    }
    await oportunidadService.remove(id);
    res.status(204).send(); // 204 No Content: Éxito sin devolver contenido
  } catch (error: any) {
    res.status(500).json({ message: 'Error al eliminar la oportunidad', error: error.message });
  }
};