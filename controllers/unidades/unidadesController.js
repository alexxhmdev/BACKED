import unidadesModel from '../../models/unidades/unidadesModel.js';
import empresaModel from '../../models/empresa/empresaModel.js';

// Crear una nueva unidad
const createUnit = async (req, res) => {
  const { descripcion, fabricante, modelo_tipo, año_fabricacion, num_serie, foto, nombre_empresa } = req.body;

  try {
    if (!descripcion || !fabricante || !modelo_tipo || !año_fabricacion || !num_serie || !foto || !nombre_empresa) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    let empresa = await empresaModel.findOne({
      where: {
        razon_social: nombre_empresa,
      },
    });

    if(!empresa) {
      return res.status(404).json({ message: 'Empresa no encontrada' });
    }

    const unidadNueva = await unidadesModel.create({
      descripcion,
      fabricante,
      modelo_tipo,
      año_fabricacion,
      num_serie,
      foto,
      id_empresa: empresa.id_empresa,
    });

    res.status(201).json({ message: 'Unidad creada exitosamente', user: unidadNueva });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear la unidad', error });
  }
};

// Obtener todos los usuarios
const getAllUnits = async (req, res) => {
  try {
    const unidades = await unidadesModel.findAll({
      where: {
        status: true,
      }
    });
    res.json(unidades);

    if (!unidades) {
        return res.status(404).json({ message: 'Unidades no encontradas' });
    }
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener las unidades', error });
  }
};

// Obtener un usuario por ID
const getUnitById = async (req, res) => {
    const { id } = req.params;
  
    try {
      const unidad = await unidadesModel.findOne({
        where: {
          id_unidad: id, // Verifica el ID
          status: true,  // Verifica que esté activa
        },
      });
  
      if (!unidad) {
        return res.status(404).json({ message: 'Unidad no encontrada' });
      }
  
      res.json(unidad);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al obtener la unidad', error });
    }
};
  
// Actualizar un usuario
const updateUnit = async (req, res) => {
  const { id } = req.params;
  const { descripcion, fabricante, modelo_tipo, año_fabricacion, num_serie, foto } = req.body;

  try {
    const unidad = await unidadesModel.findByPk(id);
    if (!unidad) {
      return res.status(404).json({ message: 'Unidad no encontrada' });
    }
    
    await unidad.update(req.body);
    res.json({ message: 'Unidad actualizada correctamente', unidad });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar la unidad', error });
  }
};

// Eliminar un usuario
const deleteUnit = async (req, res) => {
  const { id } = req.params;

  try {
    const unidad = await unidadesModel.findByPk(id);
    if (!unidad) {
      return res.status(404).json({ message: 'Unidad no encontrada' });
    }

    await unidad.update({ status: false});
    res.json({ message: 'Unidad eliminada correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar la unidad', error });
  }
};

// Exportar todas las funciones como un objeto
export const unidadesController = {
  createUnit,
  getAllUnits,
  getUnitById,
  updateUnit,
  deleteUnit,
};
