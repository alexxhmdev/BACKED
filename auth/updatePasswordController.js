import { verifyPasswordResetCode, confirmPasswordReset } from "firebase/auth";
import { firebaseAuth } from "../utils/firebaseAuthService.js";
import bcrypt from "bcryptjs";
import usuariosModel from "../models/usuarios/usuariosModel.js";

export const updatePasswordController = async (req, res) => {
  const { oobCode, newPassword } = req.body;

  try {
    // Verificar el oobCode y obtener el correo asociado
    const email = await verifyPasswordResetCode(firebaseAuth, oobCode);

    // Confirmar el restablecimiento de contraseña
    await confirmPasswordReset(firebaseAuth, oobCode, newPassword);

    // Hashear la nueva contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Actualizar la contraseña en la base de datos local
    await usuariosModel.update(
      { password: hashedPassword },
      { where: { email } }
    );

    res.status(200).json({ message: "Contraseña actualizada correctamente" });
  } catch (error) {
    console.error("Error al actualizar la contraseña:", error);
    res.status(500).json({ message: "Error al actualizar la contraseña", error });
  }
};
