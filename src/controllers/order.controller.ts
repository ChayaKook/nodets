// Order.controller.ts

import { NextFunction, Request, Response } from 'express';
import express from 'express';
import { Order } from '../db/schemas/order.schema'
import log4js from 'log4js';
import OrderService from '../services/order.service';

log4js.configure('./log4js.json');
const logger = log4js.getLogger();

const router = express.Router();
const orderService = new OrderService();
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
 *   name: orders
 *   description: API endpoints for managing Orders
 *   security:
 *     - BearerAuth: []
 */

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Get all Orders
 *     tags: [orders]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: A list of Orders
 */

router.get('/', async (req: Request, res: Response) => {
    try {
        let Orders = await orderService.getOrders();
        logger.info(`[GET] - ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()} - getOrders - Success`);
        res.send(Orders)

    } catch (error:any) {
        logger.error(`[GET] - ${new Date().toISOString()} - getOrders - Error: ${error}`);
        const statusCode = error!.status! || 500;
        res.status(statusCode).send({ message: error.message })
    }
});

/**
 * @swagger
 * /orders/:id:
 *   get:
 *     summary: Get a Order by ID
 *     tags: [orders]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Order ID
 *     responses:
 *       '200':
 *         description: Order details
 */

router.get('/Orders/:id', (req: Request, res: Response) => {
    try {
        const OrderId = req.params.id;
        logger.info(`[GET] - ${new Date().toISOString()} - getOrderById - Success`);
        return orderService.getOrderById(OrderId);
    } catch (error:any) {
        logger.error(`[GET] - ${new Date().toISOString()} - getOrderById - Error: ${error}`);
        const statusCode = error!.status! || 500;
        res.status(statusCode).send({ message: error.message })
    }
});

/**
 * @swagger
 * /Orders:
 *   post:
 *     summary: Create a new Order
 *     tags: [orders]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Order created successfully
 */


router.post('/', async (req: Request, res: Response) => {
    try {
        const body = req.body;

        const Order: Order = body.order;
        if (!Order) {
            throw new Error("Create order faild");
        }
        const createdOrder = await orderService.createOrder(Order);
        logger.info(`[POST] - ${new Date().toISOString()} - createOrder - Success`);
        res.send(createdOrder);
    } catch (error:Error|any) {
        logger.error(`[POST] - ${new Date().toISOString()} - createOrder - Error: ${error}`);
        res.status(400).send(error!.message);
    }
});


/**
 * @swagger
 * /orders/:id:
 *   put:
 *     summary: Update a Order
 *     tags: [orders]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Order updated successfully
 */

router.put('/:id', (req: Request, res: Response) => {
    try {
        logger.info(`[UPDATE] - ${new Date().toISOString()} - updateOrder - Success`);

        const updatedOrder: Order = req.body;
        const Order = orderService.updateOrder(updatedOrder);
        res.status(200).json(Order);
    } catch (error:any) {
        logger.error(`[UPDATE] - ${new Date().toISOString()} - updateOrder - Error: ${error}`);
        const statusCode = error!.status! || 500;
        res.status(statusCode).send({ message: error.message })
    }
});

/**
 * @swagger
 * /orders/:id:
 *   delete:
 *     summary: Delete a Order by ID
 *     tags: [orders]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Order ID
 *     responses:
 *       '204':
 *         description: Order deleted successfully
 */

router.delete('/:id', async (req: Request, res: Response): Promise<void> => {
    try {
        const OrderId = req.params.id;
        await orderService.deleteOrder(OrderId);
        logger.info(`[DELETE] - ${new Date().toISOString()} - deleteOrder - Success`);

        res.status(204).send();
    } catch (error:any) {
        logger.error(`[DELETE] - ${new Date().toISOString()} - deleteOrder - Error: ${error}`);
        const statusCode = error!.status! || 500;
        res.status(statusCode).send({ message: error.message })
    }
});

export { router };
