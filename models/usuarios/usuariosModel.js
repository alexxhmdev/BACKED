import { DataTypes } from 'sequelize';
import sequelize from '../../config/baseDatos.config.js';

const usuariosModel = sequelize.define('tabla_usuarios', {
  id_usuario: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4, // Genera automáticamente un UUID único
    allowNull: false,
    primaryKey: true,
  },
  usuario: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // Validación de que no exista un usuario con el mismo nombre
    validate: {
      len: [3, 255], // Validación de longitud mínima y máxima
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // Validación de unicidad
    validate: {
      isEmail: true, // Validación de formato de email
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [3, 255], // Validación de longitud mínima y máxima
    },
  },
  rol: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [['administrador', 'usuario']], // Validación de que el rol sea 'administrador' o 'usuario'
    },
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
  firebase_uid: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: 'tabla_usuarios', // Nombre exacto de la tabla en la base de datos
  timestamps: true,  // Agrega automáticamente createdAt y updatedAt
});

export default usuariosModel;
