var mysql = require("mysql");
var connection = mysql.createConnection(
    {
        host:       "172.30.10.27",
        user:       "prueba",
        password:   "prueba",
        database:   "store"
    }
);

var categoriasModel ={};
categoriasModel.crearCategoria=function(categoriaData,callback){
    if(connection){
        connection.query("INSERT INTO categories SET ?",categoriaData,function(err,resultado){
        if(err)
            callback(err,null);
        else
        callback(null,{id:resultado.insertId});
        });
    }
}
categoriasModel.listarCategorias = function(callback){
    if(connection){
        connection.query("SELECT * FROM categories",function(err,resultado){
            if(err){
                callback(err,null);
            }else{
                callback(null,resultado);
            }
        });
    }
}
categoriasModel.eliminarCategoria=function(id,callback){
    if(connection){
        connection.query("DELETE FROM categories WHERE category_id="+connection.escape(id),function(err,resultado){
        if(err)
            callback(err,null);
        else
        callback(null,{id:0});
        });
    }
}
module.exports=categoriasModel;