import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

export const verificarToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // "Bearer TOKEN"

  if (!token) {
    return res.status(403).json({ message: 'Token no proporcionado' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.usuario = decoded; // guardamos el usuario en la request
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token inválido o expirado' });
  }
};
