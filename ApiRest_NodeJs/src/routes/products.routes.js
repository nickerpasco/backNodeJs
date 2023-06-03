import { Router } from "express";

import { verifyToken } from "../middlewares/authJwt.js";

import {
  sendLogin,
  getTest,
  getProducts,
  createNewProduct,
  getProductById,
  deleteProductById,
  getTotalProducts,
  updateProductById,
} from "../controllers/products.controller";

const router = Router();




router.post("/login" , sendLogin);

 
router.get("/test" , [verifyToken], getTest);

router.get("/products", getProducts);

router.post("/products", createNewProduct);

router.get("/products/count", getTotalProducts);

router.get("/products/:id", getProductById);

router.delete("/products/:id", deleteProductById);

router.put("/products/:id", updateProductById);

 

export default router;
