import sequelize from './baseDatos.config.js';

export const inicializarBaseDatos = async () => {
  try {
    await sequelize.sync({ alter: true }); //Para modificaciones true
    console.log('La base de datos y las tablas han sido sincronizadas.');
  } catch (error) {
    console.error('Error al sincronizar la base de datos:', error);
  }
};
