import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const uri = 'mongodb+srv://0323105847:Marcos2210@genkaimr.e0di4dw.mongodb.net/MalboucheWeb?retryWrites=true&w=majority&appName=GenkaiMR';

const empleadoSchema = new mongoose.Schema({ _id: Number }, { strict: false });
const Empleado = mongoose.model('empleado', empleadoSchema, 'empleado');

async function hashPasswords() {
  await mongoose.connect(uri);

  const empleados = await Empleado.find({});
  for (const emp of empleados) {
    if (typeof emp.password === 'string' && !emp.password.startsWith('$2b$')) {
      const hash = await bcrypt.hash(emp.password, 10);
      await Empleado.updateOne({ _id: emp._id }, { $set: { password: hash } });
      console.log(`Contraseña actualizada para: ${emp.correo}`);
    }
  }

  await mongoose.disconnect();
}

hashPasswords()