import { DataTypes } from 'sequelize';
import sequelize from '../../config/baseDatos.config.js';

const unidadesModel = sequelize.define('tabla_unidades', {
  id_unidad: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4, // Genera automáticamente un UUID único
    allowNull: false,
    primaryKey: true,
  },
  descripcion: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [5, 255], // Validación de longitud mínima y máxima
    },
  },
  fabricante: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      len: [3, 255], // Validación de longitud mínima y máxima
    },
  },
  modelo_tipo: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      len: [3, 255], // Validación de longitud mínima y máxima
    },
  },
  año_fabricacion: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      len: [4, 4], // Validación de longitud mínima y máxima
    },
  },
  num_serie:{
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
    validate: {
      len: [8, 17], // Validación de longitud mínima y máxima
    },
  },
  foto:{
    type: DataTypes.TEXT,
    allowNull: true, 
  },
  status: {
    type: DataTypes.BOOLEAN,
    defaultValue: true, // El estado inicial es activo
    allowNull: false, // No puede ser nulo
  },
  id_empresa: { // Clave foránea
    type: DataTypes.UUID,
    allowNull: false, // Es obligatorio
  },
}, {
  tableName: 'tabla_unidades', // Nombre exacto de la tabla en la base de datos
  timestamps: true,  // Agrega automáticamente createdAt y updatedAt
});

export default unidadesModel;

