import Rol from '../../models/rol.js';

const validarRolExistente = async (IDRol) => {
  const rol = await Rol.findById(IDRol);
  return !!rol;
};

export { validarRolExistente };
