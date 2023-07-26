const express = require ('express');
const cors = require('cors');//Habilitar la comunicación entre diferentes dominios o servidores en la web
const { connectToMongoDB, disconnectFromMongoDB } = require('./src/mongodb');
const app = express();
const PORT = process.env.PORT || 3000;

//Middleware
app.use(cors());
app.use(express.json());
app.use ((req, res, next) => {
    res.header("Content-Type", "application/json; charser=utf-8");
    next();
});

// Ruta principal
app.get('/', (req, res) => {
    res.status(200).send('Bienvenido a la API del proyecto integrador!');
});

//Endpoints
// Ruta para obtener todas los productos
app.get('/productos', async (req, res) => {
    const client = await connectToMongoDB();
    if (!client) {
        res.status(500).send('Error al conectarse a MongoDB');
        return;
    }
    const db = client.db('Productos');
    const productos = await db.collection('Productos').find().toArray();

    await disconnectFromMongoDB();
    res.json(productos);
});

// Ruta para obtener un producto por su ID
app.get('/productos/:id', async (req, res) => {
    const productoId = parseInt(req.params.id) || 0; 
    const client = await connectToMongoDB();
    if (!client) {
        res.status(500).send('Error al conectarse a MongoDB');
        return;
    }
    const db = client.db('Productos');
    const producto = await db.collection('Productos').findOne({ id: productoId });

    await disconnectFromMongoDB();
        !producto ? res.status(404).send(`No se encontró producto con ID ${productoId}`)
               :res.json(producto);
});


// Ruta para obtener un producto por su nombre
app.get('/productos/nombre/:nombre', async (req, res) => {
  const productoNombre = req.params.nombre;
  const client = await connectToMongoDB();
  if (!client) {
    res.status(500).send('Error al conectarse a MongoDB');
    return;
  }

  const regex = new RegExp(productoNombre.toLowerCase(), 'i');
  const db = client.db('Productos');
  const productos = await db.collection('Productos').find({ nombre: regex }).toArray();

  await disconnectFromMongoDB();

  if (!productos || productos.length === 0) {
    res.status(404).send(`No se encontraron productos con el nombre ${productoNombre}`);
  } else {
    res.json(productos);
  }
});

// Ruta para obtener un producto por su importe
app.get('/productos/importe/:precio', async (req, res) => {
    const productoPrecio = parseInt(req.params.precio) || 0;
    const client = await connectToMongoDB();
    if (!client) {
      res.status(500).send('Error al conectarse a MongoDB');
        return;
    }
    const db = client.db('Productos');
    const producto = await db
      .collection('Productos')
      .findOne({ precio: productoPrecio });

    await disconnectFromMongoDB();
        !producto ? res.status(404).send(`No se encontró producto con un importe de ${productoPrecio}`)
               :res.json(producto);
});

//Crear un nuevo recurso en el servidor
app.post('/productos', async(req, res) => {
    const nuevoProducto = req.body; 
        if(nuevoProducto === undefined) {
            res.status(400).send('Error en el formato de datos a crear.');
        }
    const client =await connectToMongoDB();
        if(!client) {
            res.status(500).send('Error al conectarse a MongoDB.');
        }
    const collection = client.db('Productos').collection('Productos');//Obtener coleccion
          collection.insertOne(nuevoProducto)
          .then(() => {
            console.log('Nuevo producto creado:');
            res.status(201).send(nuevoProducto);
          })
          .catch(error => {
            console.error(error);
          })
          .finally(() => {
            client.close();
          })
});

//Modificar un recurso existente 
app.put('/productos/:id', async (req, res) => {
    const id = req.params.id;
    const nuevosDatos = await req.body;

    if(!nuevosDatos) {
        res.status(400).send('Error en el formato de datos recibido');
    }

    const client = await connectToMongoDB();
        if(!client) {
            res.status(500).send('Error al conectarse a MongoDB');
        }

        const collection = client.db('Productos').collection('Productos');
        collection.updateOne({ id: parseInt(id) }, { $set: nuevosDatos})
        .then(() => {
            console.log('Producto modificado:');
            res.status(200).send(nuevosDatos);
          })
          .catch(error => {
            res.status(500).json({descripcion: 'Error al modificar el producto'});
          })
          .finally(() => {
            client.close();
          });
});

//Eliminar un recurso existente
app.delete('/productos/:id', async (req, res) => {
    const id = req.params.id;
    if (!id) {
      return res.status(400).send('El formato de datos es erróneo o inválido');
    }
  
    const client = await connectToMongoDB();
    if (!client) {
      return res.status(500).send('Error al conectarse a MongoDB');
    }
  
    client.connect()
      .then(() => {
        const collection = client.db('Productos').collection('Productos'); //Obtener colección
        return collection.deleteOne({ id: parseInt(id) });
      })
      .then((resultado) => {
        if (resultado.deletedCount === 0) {
          res.status(404).send('No se encontró ningún producto con el ID proporcionado: ' + id);
        } else {
          console.log('Producto eliminado.');
          res.status(204).send();
        }
      })
      .catch(error => {
        console.error(error);
        res.status(500).send('Error al intentar eliminar el producto');
      })
      .finally(() => {
        client.close();
    });
});


// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor en ejecución en el puerto ${PORT}`);
  });