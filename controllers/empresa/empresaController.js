import empresaModel from '../../models/empresa/empresaModel.js';

// Crear una nueva empresa
const createCompany = async (req, res) => {
  const { razon_social, rfc, direccion, telefono, email} = req.body;

  try {
    if (!razon_social || !rfc || !direccion || !telefono || !email) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    const empresaNueva = await empresaModel.create({
      razon_social,
      rfc,
      direccion,
      telefono,
      email,
    });

    res.status(201).json({ message: 'Información de la empresa creada exitosamente', user: empresaNueva });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al agregar la información de la empresa', error });
  }
};

// Obtener toda la información de la empresa
const getAllCompany = async (req, res) => {
  try {
    const empresa = await empresaModel.findAll({
      where: {
        status: true,
      }
    });
    res.json(empresa);

    if (!empresa) {
        return res.status(404).json({ message: 'Empresa no encontrada' });
    }
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener la empresa', error });
  }
};

// Obtener la empresa por su ID
const getCompanyById = async (req, res) => {
    const { id } = req.params;
  
    try {
      const empresa = await empresaModel.findOne({
        where: {
          id_empresa: id, // Verifica el ID
          status: true,  // Verifica que esté activa
        },
      });
  
      if (!empresa) {
        return res.status(404).json({ message: 'Empresa no encontrada' });
      }
  
      res.json(empresa);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al obtener la empresa', error });
    }
};
  
// Actualizar un usuario
const updateCompany = async (req, res) => {
  const { id } = req.params;
  const { razon_social, rfc, direccion, telefono, email} = req.body;

  try {
    const empresa = await empresaModel.findByPk(id);

    if (!empresa) {
      return res.status(404).json({ message: 'Empresa no encontrada' });
    }
    
    await empresa.update(req.body);

    res.json({ message: 'Empresa actualizada correctamente', empresa });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar la empresa', error });
  }
};

// Eliminar un usuario
const deleteCompany = async (req, res) => {
  const { id } = req.params;

  try {
    const empresa = await empresaModel.findByPk(id);
    if (!empresa) {
      return res.status(404).json({ message: 'Empresa no encontrada' });
    }

    await empresa.update({ status: false});
    res.json({ message: 'Empresa eliminada correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar la empresa', error });
  }
};

// Exportar todas las funciones como un objeto
export const empresaController = {
  createCompany,
  getAllCompany,
  getCompanyById,
  updateCompany,
  deleteCompany,
};
