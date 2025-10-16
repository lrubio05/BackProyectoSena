import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Función para obtener todas las homologaciones
export const getAll = async () => {
  const homologaciones = await prisma.homologacion.findMany();
  return homologaciones;
};

// Función para obtener una homologación por ID
export const getById = async (id: string) => {
  const homologacion = await prisma.homologacion.findUnique({
    where: { id: parseInt(id) },
  });
  if (!homologacion) {
    throw new Error('Homologación no encontrada');
  }
  return homologacion;
};

// Función para crear una nueva homologación
export const create = async (homologacionData: any) => {
  const { nombreHomol, id_oportunidad } = homologacionData;
  
  if (!nombreHomol || !id_oportunidad) {
    throw new Error('Nombre y oportunidad son obligatorios.');
  }

  // Use transaction to ensure data consistency
  return await prisma.$transaction(async (tx) => {
    // Crear homologacion
    const newHomologacion = await tx.homologacion.create({
      data: { nombreHomol }
    });

    await tx.relacionOportHomol.create({
      data: {
      oportunidades_id: parseInt(id_oportunidad),
      homologaciones_id: newHomologacion.id
      }
    });

    return newHomologacion;
  });
};

// Función para actualizar una homologación
export const update = async (id: string, homologacionData: any) => {
  const updatedHomologacion = await prisma.homologacion.update({
    where: { id: parseInt(id) },
    data: {
      nombreHomol: homologacionData.nombreHomol
    },
  });
  return updatedHomologacion;
};

// Función para eliminar una homologación
export const remove = async (id: string) => {
  const deletedHomologacion = await prisma.homologacion.delete({
    where: { id: parseInt(id) },
  });
  return deletedHomologacion;
};