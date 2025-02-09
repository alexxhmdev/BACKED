import { DataTypes } from 'sequelize';
import sequelize from '../../config/baseDatos.config.js';

const empresaModel = sequelize.define('tabla_empresa', {
  id_empresa: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4, // Genera automáticamente un UUID único
    allowNull: false,
    primaryKey: true,
  },
  razon_social: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      len: [5, 100], // Validación de longitud mínima y máxima
    },
  },
  rfc: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
    validate: {
      len: [12, 12], // Validación de longitud mínima y máxima
    },
  },
  direccion: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      len: [10, 255], // Validación de longitud mínima y máxima
    },
  },
  telefono: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
    validate: {
      len: [10, 15], // Validación de longitud mínima y máxima
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
    validate: {
      isEmail: true, // Valida que sea un email
    },
  },
  status: {
    type: DataTypes.BOOLEAN,
    defaultValue: true, // El estado inicial es activo
    allowNull: false, // No puede ser nulo
  },
}, {
  tableName: 'tabla_empresa', // Nombre exacto de la tabla en la base de datos
  timestamps: true,  // Agrega automáticamente createdAt y updatedAt
});

export default empresaModel;
