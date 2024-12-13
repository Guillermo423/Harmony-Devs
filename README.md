# Harmony-Devs
Pagina web que funciona como tienda de instrumentos musicales

Nombre del proyecto: Harmony Devs
Descripción breve del sistema: Tienda de instrumentos musicales de cuerda, que permite la gestión de los instrumentos, los clientes y los usuarios.
Instrucciones de instalación y ejecución: 




 acordes_perfectos/
 ├── backend/
  |──── dist/
 |─── node_modules
 │   ├── src/
 │   │   ├── controllers/
 │   │   │   ├── clientController.ts
 │   │   │   ├── dashboardController.ts
 │   │   │   ├── instrumentController.ts
 │   │   │   └── userController.ts
 │   │   ├── middleware/
 │   │   │   ├── authMiddleware.ts
 │   │   │   └── isAdmin.ts
 │   │   ├── models/
 │   │   │   ├── Client.ts
 │   │   │   ├── Instrument.ts
 │   │   │   └── User.ts
 │   │   ├── routes/
 │   │   │   ├── clientRoutes.ts
 │   │   │   ├── dashboardRoutes.ts
 │   │   │   ├── instrumentRoutes.ts
 │   │   │   └── userRoutes.ts
 │   │   ├── types/
 │   │   │   └── multer-storage-cloudinary.d.ts
 │   │   └── utils/
 │   │       ├── cloudinary.ts
 │   │       ├── db.ts
 │   │       ├── multer.ts
 │    |---- app.ts
 │   |------server.ts
 │── .env
 │── .gitignore
 │── package-lock.json
 │── package.json
 │── tsconfig.json
 └── ...
 
 frontend/
 ├── node_modules/
 ├── public/
 │   ├── index.html
 │   ├── favicon.ico
 │   ├── ... (Imágenes, archivos CSS)
 └── src/
     ├── components/
     │   ├── clients/
     │   ├── instrument/
     │   ├── usuarios/
     │   └── Addproduct.tsx
   
     ├── models/
     │   ├── Product.ts
     │   ├── User.ts
     │   └── ... (Otros modelos)
     ├── pages/
     │   ├── HomePage.tsx
     │   ├── ProductsPage.tsx
     │   ├── CartPage.tsx
     │   ├── LoginPage.tsx
     │   ├── RegisterPage.tsx
     │   └── ... (Otras páginas)
     ├── services/
     │   ├── ProductService.ts
     │   ├── UserService.ts
     │   └── ... (Otros servicios)
     ├── utils/
     │   ├── formatCurrency.ts
     │   ├── validateEmail.ts
     │   └── ... (Otras funciones de utilidad)
     ├── App.css
     ├── App.test.tsx
     ├── App.tsx
     ├── index.css
     ├── index.tsx
     ├── logo.svg
     ├── reportWebVitals.ts
     ├── setupTests.ts
     └── ... (Otros archivos)




Instalacion: 
1. Instalación del Proyecto:
Crear la carpeta principal: Crea una nueva carpeta en tu computadora llamada "acordes_perfectos".
Crear la subcarpeta backend: Dentro de la carpeta "acordes_perfectos", crea una nueva carpeta llamada "backend".
2. Configurar el Backend:
Navegar a la carpeta backend: Abre la terminal o línea de comandos y navega a la carpeta "backend".
Inicializar el proyecto: Ejecuta el comando npm init -y.
Instalar dependencias: Ejecuta el comando npm install express mongoose cors dotenv.
Instalar herramientas de desarrollo: Ejecuta el comando npm install -D nodemon eslint prettier eslint-config-prettier eslint-plugin-node eslint-plugin-import.
3. Configurar el Frontend:
Navegar a la carpeta principal: Abre la terminal o línea de comandos y navega a la carpeta "acordes_perfectos".
Crear la aplicación React: Ejecuta el comando npx create-react-app frontend --template typescript.
Instalar dependencias: Ejecuta el comando npm install react-router-dom @mui/material @emotion/react @emotion/styled axios.
Instalar herramientas de desarrollo: Ejecuta el comando npm install -D eslint prettier eslint-config-prettier eslint-plugin-react eslint-plugin-react-hooks.
4. Inicializar Git:
Navegar a la carpeta principal: Abre la terminal o línea de comandos y navega a la carpeta "acordes_perfectos".
Inicializar Git: Ejecuta el comando git init.
Crear archivo .gitignore: Ejecuta el comando npx create-gitignore node.
Repetir para el frontend: Navega a la carpeta frontend y repite los pasos anteriores.
5. Construir y Ejecutar:
Backend:
Construir: Ejecuta el comando npm run build.
Frontend:
Iniciar: Ejecuta el comando npm start.
6. Ejecutar el Backend:
Navegar a la carpeta backend: Abre la terminal o línea de comandos y navega a la carpeta "backend".
Iniciar el servidor: Ejecuta el comando npm start.


Roles de los integrantes:
Frontend Developer: Guillermo Alejandro Martínez Girón
Backend Developer: Olga Lucia Muñoz Quintero
DB Manager: Olga Lucia Muñoz Quintero
Líder del Proyecto: Guillermo Alejandro Martínez Girón.

