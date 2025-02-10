import express from "express";
import bodyParser from "body-parser";
import cors from "cors"; // Importar CORS

import { usuariosRoutes } from "./routes/usuarios/usuariosRoutes.js";
import { unidadesRoutes } from "./routes/unidades/unidadesRoutes.js";
import { empresaRoutes } from "./routes/empresa/empresaRoutes.js";
import { costosRoutes } from "./routes/costos/costosRoutes.js";

import { loginRoute } from "./routes/auth/loginRoute.js";
import { logoutRoute } from "./routes/auth/logoutRoute.js";
import { updatePasswordRoute } from "./routes/auth/updatePasswordRoute.js";

import { config } from './config/config.js';
import { configurarRelaciones } from "./models/relaciones/relacionesModel.js";
import { inicializarBaseDatos } from "./config/iniciarBasedatos.config.js";
import { autenticacionMiddleware } from "./middlewares/autenticacionMiddleware.js";
import { verificarTablasVacias } from "./utils/verificaTablasVacias.js";
import cookieParser from 'cookie-parser';


import { gastosRoutes } from './routes/costos/funcionesCostos/funcionesCostos.js';


const { PORT_SERVER } = config;
const app = express();
const port = PORT_SERVER;

(async () => {
  try {
    await configurarRelaciones();
    await inicializarBaseDatos();

    // Configurar CORS
    app.use(
      cors({
        origin: "http://localhost:5173","https://steady-bombolone-6aabf8.netlify.app/" // Permitir el origen del frontend
        methods: ["GET", "POST", "PUT", "DELETE"], // Métodos HTTP permitidos
        credentials: true, // Si necesitas enviar cookies o encabezados de autenticación
      })
    );

    // Middleware para parsear los cuerpos de las solicitudes como JSON
    app.use(bodyParser.json({limit:"10mb"}));

    // Middleware para parsear los cookies del cliente en las solicitudes
    app.use(cookieParser());

    // Middleware para validar la autenticación
    app.use("/api/v1/auth", loginRoute);
    app.use('/api/v1/logout', logoutRoute);
    app.use("/api/v1/update-password", updatePasswordRoute);

    const tablasEstado = await verificarTablasVacias();

    // Validar si las tablas están vacías y en caso afirmativo habilitar las rutas con autenticación

    // Usar las rutas del usuario
    //if (tablasEstado.usuariosVacios) {
      app.use("/api/v1/usuarios", usuariosRoutes);
    //} else {
    //  app.use("/api/v1/usuarios", autenticacionMiddleware, usuariosRoutes);
    //}

    // Usar las rutas de las unidades
    //if (tablasEstado.unidadesVacios) {
      app.use("/api/v1/unidades", unidadesRoutes);
    //} else {
    //  app.use("/api/v1/unidades", autenticacionMiddleware, unidadesRoutes);
    //}

    // Usar las rutas de la empresa
    //if (tablasEstado.empresasVacios) {  
      app.use("/api/v1/empresa", empresaRoutes);
    //} else {
    //  app.use("/api/v1/empresa", autenticacionMiddleware, empresaRoutes);
    //}

    // Usar las rutas de los costos
    //if (tablasEstado.costosVacios) {
      app.use("/api/v1/costos", costosRoutes);
    //} else { 
    //  app.use("/api/v1/costos", autenticacionMiddleware, costosRoutes);
    //}

    // Usar las rutas de los costos
    //if (tablasEstado.costosVacios) {
      app.use("/api/v1/gastos", gastosRoutes);
    //} else { 
    //  app.use("/api/v1/costos", autenticacionMiddleware, costosRoutes);
    //}
    
    const HOST = "0.0.0.0";

    app.listen(port, HOST, () => {
      console.log(`Servidor ejecutándose en http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Error al inicializar el servidor:", error);
  }
})();
