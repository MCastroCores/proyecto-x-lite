// Importamos las dependencias.
import express from 'express';

// Importamos los controladores.
import {
  updateUserAvatarController,
  updateUserController,
  getOwnUserController,
  getUserProfileController,
  loginUserController,
  newUserController,
  validateUserController,
} from '../controllers/users/index.js';

// Importamos los middlewares.
import {
  authUserController,
  userExistsController,
} from '../middlewares/index.js';

// Creamos un router.
export const userRouter = express.Router();

// Crear un usuario pendiente de activar.
userRouter.post('/users/register', newUserController);

// Validar a un usuario.
userRouter.put('/users/validate/:registrationCode', validateUserController);

// Login de usuario.
userRouter.post('/users/login', loginUserController);

// Obtener perfil público de un usuario.
userRouter.get(
  '/users/:userId',
  userExistsController,
  getUserProfileController
);

// Obtener perfil privado de un usuario.
userRouter.get(
  '/users',
  authUserController,
  userExistsController,
  getOwnUserController
);

// Editar un usuario.
userRouter.put(
  '/users',
  authUserController,
  userExistsController,
  updateUserController
);

// Editar el avatar de un usuario.
userRouter.put(
  '/users/avatar',
  authUserController,
  userExistsController,
  updateUserAvatarController
);
