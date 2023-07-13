const { request, response, query } = require("express");
const MySQLConnection = require("../database/db");

const getProductos = (request, response) => {
  console.log(request.body);
  MySQLConnection.query("SELECT * FROM productos", (err, rows, fields) => {
    if (!err) {
      response.status(200).json(rows);
    } else {
      response.status(400).send({ message: "No se encuentran datos" });
    }
  });
};

const getProductosId = async (request, response) => {
  const { id } = request.params;
  MySQLConnection.query(
    "SELECT * FROM productos WHERE id = ?",
    [id],
    (err, rows, fields) => {
      if (!err) {
        response.json(rows[0]);
      } else {
        response.status(400).send(err.message);
      }
    }
  );
};

const agreeProduct = async (request, response) => {
  console.log(request.body);
  const { id, name, descripcion, precio } = request.body;
  const query = `INSERT INTO productos(id, name, descripcion, precio) VALUES (?, ?, ?, ?)`;
  const values = [id, name, descripcion, precio];

  try {
    const receivedData = await MySQLConnection.query(query, values);
    if (!receivedData) {
      response
        .status(400)
        .send({ message: "Algo salio mal no se puede agregar el producto" });
    }
    response.status(200).json({ message: "Producto agregado correctamente" });
  } catch (error) {
    response.status(400).send(error.message);
  }
};

const UpdateProduct = async (request, response) => {
  console.log(request.body);
  const { name, descripcion, precio } = request.body;
  const productId = request.params.id;
  const query = `UPDATE productos SET name = ?, descripcion = ?, precio = ? WHERE id = ?`;
  const values = [name, descripcion, precio, productId];

  try {
    const UpdateQueryResult = await MySQLConnection.query(query, values);
    if (!UpdateQueryResult) {
      response
        .status(400)
        .send({ message: "Algo salio mal no se puede actualizar el producto" });
    }
    response
      .status(200)
      .json({ message: "Producto actualizado correctamente" });
  } catch (error) {
    response.status(400).send(error.message);
  }
};

const DeleteProduct = async (request, response) => {
  const productId = request.params.id;
  const query = `DELETE FROM productos WHERE id =?`;
  const values = [productId];

  try {
    const deleteProduct = await MySQLConnection.query(query, values);
    if (!deleteProduct) {
      response.status(400).send({ message: "Algo salio mal" });
    }
    response.status(200).json({ message: "Producto eliminado" });
  } catch (error) {
    response
      .status(500)
      .send({ message: "Algo salio mal al querer eliminar el producto" });
  }
};

module.exports = {
  getProductos,
  agreeProduct,
  UpdateProduct,
  DeleteProduct,
  getProductosId,
};
