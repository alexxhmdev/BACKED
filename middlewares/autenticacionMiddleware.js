import jwt from 'jsonwebtoken';
import { config } from '../config/config.js';
const { SECRET_KEY } = config;


export const autenticacionMiddleware = (req, res, next) => {
  const token = req.cookies.auth_token; // Leer el token de la cookie

  if (!token) {
    return res.status(401).json({ message: 'Acceso no autorizado: Token no encontrado' });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY); // Verificar el token
    req.user = decoded; // Almacenar los datos del usuario en el request
    next(); // Continuar con la solicitud
  } catch (error) {
    console.error('Error al verificar el token:', error);
    return res.status(403).json({ message: 'Token inválido o expirado' });
  }
};



