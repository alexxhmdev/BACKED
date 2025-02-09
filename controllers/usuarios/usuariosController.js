import bcrypt from 'bcryptjs';
import usuariosModel from '../../models/usuarios/usuariosModel.js';
import empresaModel from '../../models/empresa/empresaModel.js';
import { adminSDK } from '../../utils/sdk/firebase-admin-backend.js';

// Crear un nuevo usuario
const createUser = async (req, res) => {
  const { usuario, email, password, rol, nombre_empresa } = req.body;

  try {
    if (!usuario || !email || !password || !rol || !nombre_empresa) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    let empresa = await empresaModel.findOne({
      where: {
        razon_social: nombre_empresa,
      },
    });

    if (!empresa) {
      return res.status(404).json({ message: 'Empresa no encontrada' });
    }

    const salto = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salto);

    const usuarioNuevo = await usuariosModel.create({
      usuario,
      email,
      password: hashedPassword,
      rol,
      id_empresa: empresa.id_empresa,
    });

    try {
      const firebaseUser = await adminSDK.auth().createUser({
        uid: usuarioNuevo.id_usuario.toString(),
        email,
        password,
      });

      // Actualizar el usuario local con el UID de Firebase
      await usuariosModel.update(
        { firebase_uid: firebaseUser.uid },
        { where: { id_usuario: usuarioNuevo.id_usuario } }
      );

      // Obtener el usuario actualizado con el firebase_uid
      const usuarioActualizado = await usuariosModel.findOne({
        where: { id_usuario: usuarioNuevo.id_usuario },
      });

      // Respuesta exitosa
      return res.status(201).json({
        message: 'Usuario creado exitosamente',
        user: usuarioActualizado,
      });
    } catch (firebaseError) {
      console.error('Error al registrar en Firebase:', firebaseError);

      // Si hay un error en Firebase, eliminar el usuario local para mantener consistencia
      await usuariosModel.destroy({ where: { id_usuario: usuarioNuevo.id_usuario } });

      return res.status(500).json({
        message: 'Error al registrar usuario en Firebase',
        error: firebaseError.message,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear el usuario', error });
  }
};

// Obtener todos los usuarios
// Obtener todos los usuarios con la razón social de la empresa
const getAllUsers = async (req, res) => {
  try {
    const usuarios = await usuariosModel.findAll({
      where: {
        status: true,
      },
      include: [
        {
          model: empresaModel,
          as: 'empresa',  // Especificar el alias aquí
          attributes: ['razon_social'],  // Solo si quieres obtener la razon_social
        },
      ],
    });
    

    if (!usuarios) {
      return res.status(404).json({ message: 'Usuarios no encontrados' });
    }

    // Aquí mapeamos los usuarios para agregar la razón social
    const usuariosConRazonSocial = usuarios.map((usuario) => ({
      ...usuario.toJSON(),  // Convertir el modelo a un objeto plano
      razon_social: usuario.empresa ? usuario.empresa.razon_social : null,  // Obtener la razón social
    }));

    res.json(usuariosConRazonSocial);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener los usuarios', error });
  }
};


// Obtener un usuario por ID
const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const usuarios = await usuariosModel.findOne({
      where: {
        id_usuario: id,
        status: true,
      }
    });
    if (!usuarios) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json(usuarios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener el usuario', error });
  }
};


// Actualizar un usuario
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { usuario, email, password, rol, id_empresa } = req.body; // Incluye id_empresa

  try {
    // Encuentra al usuario por su ID
    const usuarioEncontrado = await usuariosModel.findByPk(id);
    if (!usuarioEncontrado) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Si se incluye una nueva contraseña, realiza el hash
    if (password) {
      const salto = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(password, salto);
    }

    // Actualiza los campos específicos
    if (usuario) usuarioEncontrado.usuario = usuario;
    if (email) usuarioEncontrado.email = email;
    if (password) usuarioEncontrado.password = req.body.password;
    if (rol) usuarioEncontrado.rol = rol;
    if (id_empresa) usuarioEncontrado.id_empresa = id_empresa; // Actualiza id_empresa

    // Guarda los cambios en la base de datos
    await usuarioEncontrado.save();

    res.json({ message: 'Usuario actualizado correctamente', usuario: usuarioEncontrado });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar el usuario', error });
  }
};


// Eliminar un usuario
const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const usuario = await usuariosModel.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    await usuario.update({ status: false});
    res.json({ message: 'Usuario eliminado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar el usuario', error });
  }
};

// Exportar todas las funciones como un objeto
export const usuariosController = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
