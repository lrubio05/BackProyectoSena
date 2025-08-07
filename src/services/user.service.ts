import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs'; // bcrypt para el hash de contraseñas
import jwt from 'jsonwebtoken'; // jsonwebtoken para manejar tokens JWT

// Creación de la instancia de Prisma
const prisma = new PrismaClient();

// Función 'register' para registrar nuevos usuarios
export const register = async (userData: any) => {
  // Hash en la contraseña para no guardarla en texto plano
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(userData.password, salt);

  // Uso de Prisma para crear el nuevo usuario en la base de datos
  const newUser = await prisma.usuario.create({
    data: {
      username: userData.username,
      password: hashedPassword,
      nombre: userData.nombre,
      correo: userData.correo,
      rol: userData.rol,
      area: userData.area,
    },
  });

  // Nunca devuelvas la contraseña en la respuesta
  const { password, ...userWithoutPassword } = newUser;
  return userWithoutPassword;
};

// Función 'login' para autenticar usuarios
export const login = async (username: string, pass: string) => {
  // Buscar al usuario
  const user = await prisma.usuario.findUnique({ where: { username } });
  if (!user) {
    throw new Error('Tu usuario o contraseña son incorrectos');
  }

  // Comparación de la contraseña enviada con la hasheada en la BD
  const isPasswordValid = await bcrypt.compare(pass, user.password);
  if (!isPasswordValid) {
    throw new Error('Tu usuario o contraseña son incorrectos');
  }

  // Si todo es correcto, crear y firmar un token JWT
  const tokenPayload = { id: user.id, username: user.username, rol: user.rol };
  const token = jwt.sign(tokenPayload, process.env.JWT_SECRET!, { expiresIn: '1h' });

  return { message: 'Login exitoso', token };
};

//Función para obtener todos los usuarios
export const getAll = async () => {
  const users = await prisma.usuario.findMany({
    select: {
      id: true,
      username: true,
      nombre: true,
      correo: true,
      rol: true,
      area: true,
    },
  });
  return users;
};

// Función para obtener un usuario por ID
export const getById = async (id: string) => {
  const user = await prisma.usuario.findUnique({
    where: { id },
    select: {
      id: true,
      username: true,
      nombre: true,
      correo: true,
      rol: true,
      area: true,
    },
  });

  if (!user) {
    throw new Error('Usuario no encontrado');
  }
  return user;
};

// Función para actualizar un usuario
export const update = async (id: string, userData: any) => {
  // Si el usuario envía una nueva contraseña, se hashea
  if (userData.password) {
    const salt = await bcrypt.genSalt(10);
    userData.password = await bcrypt.hash(userData.password, salt);
  }

  const updatedUser = await prisma.usuario.update({
    where: { id },
    data: {
      nombre: userData.nombre,
      correo: userData.correo,
      username: userData.username,
      // Solo actualiza la contraseña si se proporcionó una nueva
      ...(userData.password && { password: userData.password }),
      rol: userData.rol,
      area: userData.area,
    },
  });

  // Quitar la contraseña de la respuesta
  const { password, ...userWithoutPassword } = updatedUser;
  return userWithoutPassword;
};

// Función para eliminar un usuario por ID
export const remove = async (id: string) => {
  const deletedUser = await prisma.usuario.delete({
    where: { id },
  });
  return deletedUser;
};