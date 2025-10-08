import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Función para obtener todos los eventos
export const getAll = async () => {
  const eventos = await prisma.evento.findMany();
  return eventos;
};

// Función para obtener un evento por ID
export const getById = async (id: string) => {
  const evento = await prisma.evento.findFirst({
    where: { id: (parseInt(id)) },
  });
  if (!evento) {
    throw new Error('Evento no encontrado');
  }
  return evento;
};

// Función para crear un nuevo evento
export const create = async (eventoData: any) => {
  const { detalle,id_homol } = eventoData;
  if (!detalle || !id_homol) {
    throw new Error('Todos los campos (detalle, id_homol) son obligatorios.');
  }
  const newEvento = await prisma.evento.create({
    data: { detalle, id_homol },
  });
  return newEvento;
};

// Función para actualizar un evento
export const update = async (id: string, eventoData: any) => {
  const updatedEvento = await prisma.evento.updateMany({
    where: { id: parseInt(id) },
    data: {
      detalle: eventoData.detalle,
      id_homol: eventoData.id_homol,
    },
  });
  if (updatedEvento.count === 0) {
    throw new Error('Evento no encontrado');
  }
  return updatedEvento;
};

// Función para eliminar un evento
export const remove = async (id: string) => {
  const deletedEvento = await prisma.evento.deleteMany({
    where: { id: parseInt(id) },
  });
  return deletedEvento;
};