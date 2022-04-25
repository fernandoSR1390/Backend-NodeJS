var express = require('express');
var mysql = require('mysql');
var cors = require('cors');

//inicio de express
var app = express();
app.use(express.json());
app.use(cors());

//establecemos los parametros de conexcion de la base de datos
var conexion =  mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'abmprueba'
})

//probando conexion
conexion.connect(function(error){
    if (error) {
        throw error;
    } else {
        console.log("Conexion a la BD Ok!");
    }
})

//mostrando todos los productos
app.get('/api/productos', (req,res)=>{
    conexion.query('SELECT * FROM productos', (error,filas)=>{
        if (error) {
            throw error;
        } else {
            res.send(filas);
        }
    })
});

//mostrando solo un producto
app.get('/api/productos/:id', (req,res)=>{
    conexion.query('SELECT * FROM productos WHERE id = ?', [req.params.id], (error,fila)=>{
        if (error) {
            throw error;
        } else {
            res.send(fila);
        }
    })
});

//crear un producto
app.post('/api/productos', (req,res)=>{
    let data = {descripcion:req.body.descripcion, precio:req.body.precio};
    let sql = "INSERT INTO  productos SET ?";
    conexion.query(sql, data, function(error, results){
        if (error) {
            throw error;
        } else {
            res.send(results);
        }
    });
});

//editar un producto
app.put('/api/productos/:id', (req,res)=>{
    let id = req.params.id;
    let descripcion = req.body.descripcion;
    let precio = req.body.precio;
    let sql = "UPDATE  productos SET descripcion = ?, precio = ? WHERE id = ?";
    conexion.query(sql, [descripcion, precio, id], function(error, results){
        if (error) {
            throw error;
        } else {
            res.send(results);
        }
    });
});

//eliminar producto
app.delete('/api/productos/:id', (req,res)=>{
    conexion.query('DELETE FROM productos WHERE id = ?', [req.params.id], function(error, filas){
        if (error) {
            throw error;
        } else {
            res.send(filas);
        }
    });
});

//abriendo en el puerto
app.listen('3000', function(){
    console.log("Servidor Ok!");
});