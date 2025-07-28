import jwt from 'jsonwebtoken';

export const validarJWT = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token || !token.startsWith('Bearer ')) {
    return res.status(401).json({ msg: 'Token no proporcionado' });
  }

  try {
    const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ msg: 'Token inválido' });
  }
};

export const soloAdmin = (req, res, next) => {
  if (req.user?.rol !== 'ADMIN') {
    return res.status(403).json({ msg: 'Solo acceso para administradores' });
  }
  next();
};

export const soloEmpleado = (req, res, next) => {
  if (req.user?.rol !== 'EMPLE') {
    return res.status(403).json({ msg: 'Solo acceso para empleados' });
  }
  next();
};
