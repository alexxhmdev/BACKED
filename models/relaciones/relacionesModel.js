import empresaModel from '../../models/empresa/empresaModel.js';
import unidadesModel from '../../models/unidades/unidadesModel.js';
import costosModel from '../../models/costos/costosModel.js';
import usuariosModel from '../../models/usuarios/usuariosModel.js';

// Función para configurar las relaciones
const configurarRelaciones = () => {
  // Relación Empresa -> Unidades (1:N)
  empresaModel.hasMany(unidadesModel, {
    foreignKey: 'id_empresa',
    sourceKey: 'id_empresa',
    as: 'unidades',
  });
  unidadesModel.belongsTo(empresaModel, {
    foreignKey: 'id_empresa',
    targetKey: 'id_empresa',
    as: 'empresa',
  });

  // Relación Empresa -> Usuarios (1:N)
  empresaModel.hasMany(usuariosModel, {
    foreignKey: 'id_empresa',
    sourceKey: 'id_empresa',
    as: 'usuarios',
  });
  usuariosModel.belongsTo(empresaModel, {
    foreignKey: 'id_empresa',
    targetKey: 'id_empresa',
    as: 'empresa',
  });

  // Relación Unidades -> Costos (1:N)
  unidadesModel.hasMany(costosModel, {
    foreignKey: 'id_unidad',
    sourceKey: 'id_unidad',
    as: 'costos',
  });
  costosModel.belongsTo(unidadesModel, {
    foreignKey: 'id_unidad',
    targetKey: 'id_unidad',
    as: 'unidad',
  });
};

// Exportar la función junto con los modelos
export { configurarRelaciones, empresaModel, unidadesModel, costosModel, usuariosModel };
