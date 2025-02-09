import express from 'express';
import { usuariosController } from '../../controllers/usuarios/usuariosController.js';

const router = express.Router();

// Definir las rutas
router.get('/', usuariosController.getAllUsers); // Obtener todos los usuarios
router.get('/:id', usuariosController.getUserById); // Obtener un usuario por ID
router.post('/', usuariosController.createUser); // Crear un nuevo usuario
router.put('/:id', usuariosController.updateUser); // Actualizar un usuario
router.delete('/:id', usuariosController.deleteUser); // Eliminar un usuario

// Exportar el router
export const usuariosRoutes = router;

