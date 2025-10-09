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
    // Create homologacion
    const newHomologacion = await tx.homologacion.create({
      data: { nombreHomol }
    });

    // Get oportunidad to access its canal_id
    const oportunidad = await tx.oportunidad.findMany({
      where: { id: parseInt(id_oportunidad) },
      select: { id_canal: true }
    });

    if (!oportunidad || oportunidad.length === 0) {
      throw new Error('Oportunidad no encontrada');
    }

    // Create relation
    // Declare variable and set default value for canalId
    const canalId = oportunidad[0]?.id_canal ?? 0;

    await tx.relacionOportHomol.create({
      data: {
      oportunidades_id: parseInt(id_oportunidad),
      oportunidades_canal_id: canalId,
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