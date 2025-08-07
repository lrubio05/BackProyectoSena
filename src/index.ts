import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/user.routes.js'; // Importar las rutas de usuario
import canalRoutes from './routes/canal.routes.js'; // Importar las rutas de canales

dotenv.config();
import cors from 'cors'; // Importar cors para permitir peticiones desde el frontend
// Crear una instancia de Express
const app = express();
const PORT = process.env.PORT || 4000;

// Middleware para que Express pueda leer JSON del cuerpo de las peticiones
app.use(cors());
app.use(express.json());

// Middleware para manejar las rutas
app.use('/api/users', userRoutes);
app.use('/api/canales', canalRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});