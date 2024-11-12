
const mongoose = require('mongoose')

const conectarDB = async () => {
    try {
        
        await mongoose.connect('mongodb://127.0.0.1:27017/usuario', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log("Conexión a la base de datos exitosa")
    } catch (error) {
        console.error("Error al conectar a la base de datos:", error)
        process.exit(1) 
    }
}

module.exports = conectarDB
