var express = require('express');
var router = express.Router();
var categoriaModel=require("../models/categorias")

/* GET home page. */
router.get('/crearCategoria', function(req, res, next) {
  res.render('categorias/crearCategoria');
});
router.post("/crearCategoria",function(req,res){
  var categoriaData={
    category_name:req.body.nombreCategoria
  };
  categoriaModel.crearCategoria(categoriaData,function(err,respuesta){
    if(err){
      console.log(err);
    res.render('categorias/crearCategoria', {mensaje:"LA CATEGORIA NO FUE CREADA"});
    }else{
      console.log(respuesta);
       res.render('categorias/crearCategoria', {mensaje:"LA CATEGORIA FUE CREADA"});
    }
  });
});
router.get('/listarCategorias', function(req, res) {
  categoriaModel.listarCategorias(function(err,respuesta){
    if(err){
      console.log(err);
       res.render('categorias/listarCategorias', {listaCategorias: [],err:"NO HAY REGISTRO DE CATEGORIA"});
    }else{
      var listaCategorias ={};
      listaCategorias=respuesta || [];
      console.log(respuesta);
      res.render('categorias/listarCategorias', {listaCategorias: listaCategorias});
    }
  });
});

router.post("/eliminarCategoria",function(req,res){
  var id= req.body.id;
  categoriaModel.eliminarCategoria(id,function(err,respuesta){
    if(err){
      console.log(err);
     res.render('categorias/listarCategorias', {listaCategorias: [],err:"ERROR AL ELIMINAR LA CATEGORIA"});
    }else{
      console.log(respuesta);
        categoriaModel.listarCategorias(function(err,respuesta){
        if(err){
          console.log(err);
          res.render('categorias/listarCategorias', {listaCategorias: [],err:"NO HAY REGISTRO DE CATEGORIA"});
        }else{
          var listaCategorias ={};
          listaCategorias=respuesta || [];
          console.log(respuesta);
          res.render('categorias/listarCategorias', {listaCategorias: listaCategorias});
        }
      });
    }
  });
});
module.exports = router;