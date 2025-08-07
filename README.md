# BackEnd

## Requisitos Previos

* [Node.js](https://nodejs.org/) (versión 18 o superior recomendada)
* [NPM](https://www.npmjs.com/)
* Una base de datos MySQL corriendo localmente.

## Instalación y Puesta en Marcha

Sigue estos pasos para tener el entorno de desarrollo funcionando:

1.  **Clona el repositorio:**
    ```bash
    git clone (https://github.com/lrubio05/BackProyectoSena.git)
    ```

2.  **Instala las dependencias:**
    ```bash
    npm install
    ```

3.  **Configura las variables de entorno:**
    * Crea una copia del archivo `.env.example` y renómbrala a `.env`.
    * Abre el nuevo archivo `.env` y añade tus credenciales de la base de datos y un secreto para JWT.

4.  **Sincroniza la base de datos:**
    Este comando leerá el esquema de Prisma y creará todas las tablas necesarias en tu base de datos.
    ```bash
    npx prisma migrate dev
    ```

5.  **Inicia el servidor de desarrollo:**
    ```bash
    npm run dev
    ```