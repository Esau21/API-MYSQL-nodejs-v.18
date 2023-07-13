const express = require("express");
const MysqlController = require('../controllers/productos');
const router = express.Router();

router.get('/productos', MysqlController.getProductos);
router.get('/pro/:id', MysqlController.getProductosId);
router.post('/addproducto', MysqlController.agreeProduct);
router.put('/updateproduct/:id', MysqlController.UpdateProduct);
router.delete('/deleteproduct/:id', MysqlController.DeleteProduct);


module.exports = router;