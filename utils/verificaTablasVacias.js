import usuariosModel from '../models/usuarios/usuariosModel.js';
import unidadesModel from '../models/unidades/unidadesModel.js';
import empresaModel from '../models/empresa/empresaModel.js';
import costosModel from '../models/costos/costosModel.js';

export const verificarTablasVacias = async () => {
  // Contamos el número de filas en cada tabla para verificar si están vacías
  const usuariosCount = await usuariosModel.count();
  const unidadesCount = await unidadesModel.count();
  const empresasCount = await empresaModel.count();
  const costosCount = await costosModel.count();

  // Devolvemos un objeto con los resultados
  return {
    usuariosVacios: usuariosCount === 0,
    unidadesVacios: unidadesCount === 0,
    empresasVacios: empresasCount === 0,
    costosVacios: costosCount === 0,
  };
};
