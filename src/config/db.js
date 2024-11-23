const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://maximalano:ClDHFMRh8h3fmj5J@cluster0.isfi5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
        });
        console.log('Conectado a MongoDB Atlas');
    } catch (error) {
        console.error(`Error al conectar a MongoDB: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;

