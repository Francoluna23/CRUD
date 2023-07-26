//Librerias de conexión a MongoDB

//utiliza el paquete 'dotenv' para cargar variables de entorno desde un archivo .env
const dotenv = require('dotenv');
    dotenv.config();

// Importar las clases MongoClient y ClientSession del paquete mongodb
const {MongoClient, ClientSession} = require('mongodb');

// Obtener la URL de conexión a MongoDB desde las variables de entorno
const URI = process.env.MONGODB_URLSTRING;

// Crear una instancia del cliente MongoClient
const client = new MongoClient(URI);

// Función asincrónica para conectar a la base de datos de MongoDB
async function connectToMongoDB() {
    try {
        // Conectar al servidor de MongoDB
        await client.connect();
            console.log('Conectado a MongoDB');
        return client;
    } catch (error) {
        console.error('Error al conectar a MonfoDB:', error);
        return null;
    }
}

// Función asincrónica para desconectar
async function disconnectFromMongoDB() {
    try {
        await client.close();
            console.log('Desconectado a MongoDB');
        return client;
    } catch (error) {
        console.error('Error al desconectar a MonfoDB:', error);
        return null;
    }
}

// Exportar las funciones connectToMongoDB y disconnectFromMongoDB para su uso en otros archivos
module.exports = { connectToMongoDB, disconnectFromMongoDB} ;

