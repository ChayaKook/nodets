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
        res.json(Orders)
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

router.get('/:id', async (req: Request, res: Response) => {
    try {
        const OrderId = req.params.id;
        const order = await orderService.getOrderById(OrderId)
        logger.info(`[GET] - ${new Date().toISOString()} - getOrderById - Success`);
        res.json(order) ;
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
        const order: Order = req.body;
        if (!order) {
            throw new Error("Create order faild");
        }
        const createdOrder = await orderService.createOrder(order);
        logger.info(`[POST] - ${new Date().toISOString()} - createOrder - Success`);
        res.json(createdOrder);
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

router.put('/:id', async (req: Request, res: Response) => {
    try {
        const orderId: string = req.params.id;
        const order: Order = req.body;
        const updatedOrder = await orderService.updateOrder(orderId,order);
        logger.info(`[UPDATE] - ${new Date().toISOString()} - updateOrder - Success`);
        res.json(updatedOrder);
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

        res.json();
    } catch (error:any) {
        logger.error(`[DELETE] - ${new Date().toISOString()} - deleteOrder - Error: ${error}`);
        const statusCode = error!.status! || 500;
        res.status(statusCode).send({ message: error.message })
    }
});

export { router };
