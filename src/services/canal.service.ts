import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Función para obtener todos los canales
export const getAll = async () => {
  const canales = await prisma.canal.findMany();
  return canales;
};

// Función para obtener un canal por ID
export const getById = async (id: string) => {
  const canal = await prisma.canal.findUnique({
    where: { id: parseInt(id) },
  });
  if (!canal) {
    throw new Error('Canal no encontrado');
  }
  return canal;
};

// Función para crear un nuevo canal
export const create = async (canalData: any) => {
  const { nombre, pais, comercial } = canalData;
  if (!nombre || !pais || !comercial) {
    throw new Error('Todos los campos (nombre, país, comercial) son obligatorios.');
  }
  const newCanal = await prisma.canal.create({
    data: { nombre, pais, comercial },
  });
  return newCanal;
};

// Función para actualizar un canal
export const update = async (id: string, canalData: any) => {
  const updatedCanal = await prisma.canal.update({
    where: { id: parseInt(id) },
    data: {
      nombre: canalData.nombre,
      pais: canalData.pais,
      comercial: canalData.comercial,
    },
  });
  return updatedCanal;
};

// Función para eliminar un canal
export const remove = async (id: string) => {
  const deletedCanal = await prisma.canal.delete({
    where: { id: parseInt(id) },
  });
  return deletedCanal;
};