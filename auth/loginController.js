
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import usuariosModel from '../models/usuarios/usuariosModel.js';
import { adminSDK } from '../utils/sdk/firebase-admin-backend.js';

import { config } from '../config/config.js';

const { SECRET_KEY } = config;

export const loginController = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Verificar si el usuario existe
    const usuario = await usuariosModel.findOne({
      where: { email, status: true },
    });

    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Verificar la contraseña
    const esPasswordValida = await bcrypt.compare(password, usuario.password);
    if (!esPasswordValida) {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }

    // Validar el email en Firebase Authentication
    try {
      const registroUsuario = await adminSDK.auth().getUserByEmail(email);
      if (!registroUsuario) {
        return res.status(404).json({ message: 'Usuario no registrado en Firebase' });
      }
    } catch (firebaseError) {
      console.error('Error en Firebase:', firebaseError);
      return res.status(500).json({ message: 'Error verificando usuario en Firebase' });
    }

    // Generar el token JWT
    const token = jwt.sign(
      { id: usuario.id_usuario, email: usuario.email, rol: usuario.rol },
      SECRET_KEY,
      { expiresIn: '5h' } // Token expira en 5 horas
    );

    // Configurar la cookie
    res.cookie('auth_token', token, {
      httpOnly: true, // Previene el acceso desde JavaScript
      secure: process.env.NODE_ENV === 'production', // Solo en producción
      sameSite: 'Strict', // Previene el envío en solicitudes cruzadas
      maxAge: 5 * 60 * 60 * 1000, // 5 horas en milisegundos
    });

    // Retornar una respuesta al cliente
    res.status(200).json({ message: 'Inicio de sesión exitoso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al iniciar sesión', error });
  }
};







