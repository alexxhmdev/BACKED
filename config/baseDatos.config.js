import { Sequelize } from 'sequelize';
import { config } from './config.js';

const { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER } = config;

// Inicializamos Sequelize con los parámetros correctos para la conexión
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: 'postgres', // Define el tipo de base de datos que usas
  logging: false,      // Opcional: Desactiva los logs de SQL en consola
});

// Probar la conexión
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión a la base de datos exitosa.');
  } catch (error) {
    console.error('No se pudo conectar a la base de datos:', error);
  }
})();

export default sequelize;
