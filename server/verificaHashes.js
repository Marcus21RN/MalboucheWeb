import mongoose from 'mongoose';

const uri = 'mongodb+srv://0323105847:Marcos2210@genkaimr.e0di4dw.mongodb.net/MalboucheWeb?retryWrites=true&w=majority&appName=GenkaiMR'; // Pon aquí tu URI real

const empleadoSchema = new mongoose.Schema({ _id: Number }, { strict: false });
const Empleado = mongoose.model('empleado', empleadoSchema, 'empleado');

async function verificaHashes() {
  await mongoose.connect(uri);
  const empleados = await Empleado.find({});
  for (const emp of empleados) {
    const esHash = typeof emp.password === 'string' && emp.password.startsWith('$2b$');
    console.log(`${emp.correo}: ${esHash ? 'HASH OK' : 'NO HASH'}`);
  }
  await mongoose.disconnect();
}

verificaHashes();