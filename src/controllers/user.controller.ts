import type { Request, Response } from 'express';
import * as userService from '../services/user.service.js';

// Función para registrar un nuevo usuario
export const registerUser = async (req: Request, res: Response) => {
  try {
    const user = await userService.register(req.body);
    res.status(201).json({ message: 'Usuario registrado exitosamente', user });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Función para iniciar sesión
export const loginUser = async (req: Request, res: Response) => {
  try {
    // Extraer el username y password del cuerpo de la petición
    const { username, password } = req.body;
    // Llamado al servicio de login
    const result = await userService.login(username, password);
    // Si el login es exitoso, se envía el token
    res.status(200).json(result);
  } catch (error: any) {
    // Si hay un error (ej. credenciales incorrectas), se envía un error 401
    res.status(401).json({ message: error.message });
  }
};

// Función para obtener todos los usuarios
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await userService.getAll();
    res.status(200).json(users);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Función para obtener un usuario por ID
export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params; // Obtener el ID de la URL
    if (!id) {
      return res.status(400).json({ message: 'Se requiere un ID de usuario' });
    }
    const user = await userService.getById(id);
    res.status(200).json(user);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

// Función para actualizar un usuario
export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: 'Se requiere un ID de usuario' });
    }
    const user = await userService.update(id, req.body);
    res.status(200).json(user);
  } catch (error: any) {
    res.status(500).json({ message: 'Error al actualizar el usuario', error: error.message });
  }
};

// Función para eliminar un usuario
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: 'Se requiere un ID de usuario' });
    }
    await userService.remove(id);
    res.status(200).json({ message: 'Usuario eliminado exitosamente' });
  } catch (error: any) {
    res.status(500).json({ message: 'Error al eliminar el usuario', error: error.message });
  }
};