// product.controller.ts

import { NextFunction, Request, Response } from 'express';
import express from 'express';
import { Product } from '../db/schemas/product.schema'
import log4js from 'log4js';
import ProductService from '../services/product.service';

log4js.configure('./log4js.json');
const logger = log4js.getLogger();

const router = express.Router();
const productService = new ProductService();
const bcrypt = require('bcrypt');
import { saltRounds, TOKEN_KEY } from "../../constants";
import AuthService from '../services/auth.service';
import tokenAuthMiddleware from '../middlewares/auth.middleware';
import { isContext } from 'vm';
import { RequestBody } from 'swagger-jsdoc';
const authService = new AuthService()


/**
 * @swagger
 * tags:
 *   name: products
 *   description: API endpoints for managing products
 *   security:
 *     - BearerAuth: []
 */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products
 *     tags: [products]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: A list of products
 */

router.get('/', async (req: Request, res: Response) => {
    try {
      let products = await productService.getProducts();
      logger.info(`[GET] - ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()} - getproducts - Success`);
      res.send(products)
    } catch (error:any) {
      logger.error(`[GET] - ${new Date().toISOString()} - getproducts - Error: ${error}`);
      const statusCode = error!.status! || 500;
      res.status(statusCode).send({ message: error.message });}
  })

/**
 * @swagger
 * /products/:id:
 *   get:
 *     summary: Get a product by ID
 *     tags: [products]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: product ID
 *     responses:
 *       '200':
 *         description: product details
 */

router.get('/products/:id', (req: Request, res: Response) => {
    try {
        const productId = req.params.id;
        logger.info(`[GET] - ${new Date().toISOString()} - getproductById - Success`);
        return productService.getProductById(productId);
    } catch (error:any) {
        logger.error(`[GET] - ${new Date().toISOString()} - getproductById - Error: ${error}`);
        const statusCode = error!.status! || 500;
        res.status(statusCode).send({ message: error.message })
    }
});

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a new product
 *     tags: [products]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: product created successfully
 */


router.post('/', async (req: Request, res: Response) => {
    try {
        const body = req.body;

        const product: Product = body.product;
        if (!product) {
            throw new Error("Create product faild");
        }
        const createdproduct = await productService.createProduct(product);
        logger.info(`[POST] - ${new Date().toISOString()} - createproduct - Success`);
        res.send(createdproduct);
    } catch (error:Error|any) {
        logger.error(`[POST] - ${new Date().toISOString()} - createproduct - Error: ${error}`);
        res.status(400).send(error!.message);
    }
});


/**
 * @swagger
 * /products/:id:
 *   put:
 *     summary: Update a product
 *     tags: [products]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: product updated successfully
 */

router.put('/:id', (req: Request, res: Response) => {
    try {
        logger.info(`[UPDATE] - ${new Date().toISOString()} - updateproduct - Success`);

        const updatedproduct: Product = req.body;
        const product = productService.updateProduct(updatedproduct);
        res.status(200).json(product);
    } catch (error) {
        logger.error(`[UPDATE] - ${new Date().toISOString()} - updateproduct - Error: ${error}`);
        throw error;
    }
});

/**
 * @swagger
 * /products/:id:
 *   delete:
 *     summary: Delete a product by ID
 *     tags: [products]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: product ID
 *     responses:
 *       '204':
 *         description: product deleted successfully
 */

router.delete('/:id', async (req: Request, res: Response): Promise<void> => {
    try {
        const productId = req.params.id;
        await productService.deleteProduct(productId);
        logger.info(`[DELETE] - ${new Date().toISOString()} - deleteproduct - Success`);

        res.status(204).send();
    } catch (error) {
        logger.error(`[DELETE] - ${new Date().toISOString()} - deleteproduct - Error: ${error}`);
        throw error;
    }
});

export { router };
