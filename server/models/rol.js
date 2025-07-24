import mongoose from 'mongoose';

const rolSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
    },
    nombre: {
        type: String,
        required: true
    }
});

export default mongoose.model('Rol', rolSchema, 'rol');
