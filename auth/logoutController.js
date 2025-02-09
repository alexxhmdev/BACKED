export const logoutController = (req, res) => {
    try {
      // Limpiar la cookie auth_token
      res.clearCookie('auth_token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Solo en producción
        sameSite: 'Strict', // Protección contra CSRF
      });
  
      // Enviar respuesta al cliente
      res.status(200).json({ message: 'Sesión cerrada correctamente' });
    } catch (error) {
      console.error('Error en el logout:', error);
      res.status(500).json({ message: 'Error al cerrar sesión', error });
    }
  };
  