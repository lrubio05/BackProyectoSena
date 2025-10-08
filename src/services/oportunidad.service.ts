import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Función para obtener todas las oportunidades
export const getAll = async () => {
  const oportunidades = await prisma.oportunidad.findMany();
  return oportunidades;
};

// Función para obtener una oportunidad por ID
export const getById = async (id: string) => {
  const oportunidad = await prisma.oportunidad.findMany({
    where: { id: parseInt(id) },
  });
  if (!oportunidad) {
    throw new Error('Oportunidad no encontrada');
  }
  return oportunidad;
};

// Función para crear una nueva oportunidad
export const create = async (oportunidadData: any) => {
  const { nombre, pais, id_canal } = oportunidadData;
  if (!nombre || !pais || !id_canal) {
    throw new Error('Todos los campos (nombre, país, id_canal) son obligatorios.');
  }
  const newOportunidad = await prisma.oportunidad.create({
    data: { nombre, pais, id_canal },
  });
  return newOportunidad;
};

// Función para actualizar una oportunidad
export const update = async (id: string, oportunidadData: any) => {
  const updatedOportunidad = await prisma.oportunidad.updateMany({
    where: { id: parseInt(id) },
    data: {
      nombre: oportunidadData.nombre,
      pais: oportunidadData.pais,
      id_canal: oportunidadData.id_canal,
    },
  });
  return updatedOportunidad;
};

// Función para eliminar una oportunidad
export const remove = async (id: string) => {
  const deletedOportunidad = await prisma.oportunidad.deleteMany({
    where: { id: parseInt(id) },
  });
  return deletedOportunidad;
};