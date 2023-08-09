// @ts-nocheck
import { Router } from "express";
import express from 'express'
import { ProductManagerMongo } from "../services/products.service.js";

export const productManagerRouter = Router();

const productService = new ProductManagerMongo (); 

productManagerRouter.use(express.json());
productManagerRouter.use(express.urlencoded({ extended: true }));

productManagerRouter.get("/", async (req, res) => {
  try {
    const allProducts = await productService .getProducts(req.query);

    res.status(200).send({ 
      payload: allProducts.docs.map((product) => ({
        id: product._id.toString(),
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
        thumbnails: product.thumbnails,
        status: product.status,
        code: product.code,
        category: product.category,
      })),
      totalPages: allProducts.totalPages,
      prevPage: allProducts.prevPage,
      nextPage: allProducts.nextPage,
      page: allProducts.page,
      hasPrevPage: allProducts.hasPrevPage,
      hasNextPage: allProducts.hasNextPage,

     });
  } catch (error) {
    res.status(400).send({ status: "error", error: error.message });
  }
});

productManagerRouter.get("/:pid", async (req, res) => {
  try {
    let pid = req.params.pid;
    const findProduct = await productService .getProductById(pid);
   res.status(200).send({ status: "success", data: findProduct });
  } catch (error) {
    res.status(400).send({ status: "error", data: error.message });
  }
});

productManagerRouter.put("/:pid", async (req, res) => {
  let updateProductClient = req.body;
  let pid = req.params.pid;
  try {
    const updateProduct = await productService .updateProduct(
      pid,
      updateProductClient
    );
   res.status(200).send({ status: "success", data: updateProduct });
  } catch (error) {
     res.status(400).send({ status: "error", data: error.message });
  }
});

productManagerRouter.post("/", async (req, res) => {
  let newProduct = req.body;
  try {
    const addProduct = await productService .addProduct(newProduct);
     res.status(201).send({ status: "success", data: addProduct });
  } catch (error) {
      res.status(400).send({
      status: "error",
      data: error.message,
    });
  }
});

productManagerRouter.delete("/:pid", async (req, res) => {
  let pid = req.params.pid;
  console.log(pid);

  try {
    const deleteProduct = await productService .deleteProduct(pid);
    return res.status(200).send({
      status: "success",
      data: "El producto eliminado es:" + deleteProduct,
    });
  } catch (error) {
    return res.status(400).send({ status: "error", data: error.message });
  }
});


