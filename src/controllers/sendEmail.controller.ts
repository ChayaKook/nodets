// sendEmail.controller.ts

import { NextFunction, Request, Response } from 'express';
import express from 'express';
import { Product } from '../db/schemas/product.schema'
import log4js from 'log4js';
import ProductService from '../services/product.service';
import { Message } from '../db/schemas/message.schema';
import { OFFICE_EMAIL, OFFICE_EMAIL_PASS, PASSWORD } from '../../constants';
const nodemailer = require('nodemailer');

log4js.configure('./log4js.json');
const logger = log4js.getLogger();

const router = express.Router();
const productService = new ProductService();

/**
 * @swagger
 * tags:
 *   name: sendEmail
 *   description: API endpoints for managing products
 *   security:
 *     - BearerAuth: []
 */


router.post('/sendToBusiness', async (req: Request, res: Response) => {
    try {
        const message: Message = req.body;
        if (!message) {
            throw new Error("there is no message to send");
        }
        // Create a transporter with your SMTP settings
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true, // upgrade later with STARTTLS
            auth: {
                user: OFFICE_EMAIL,
                pass:OFFICE_EMAIL_PASS
            }
        });

        // Setup email data
        let mailOptions = {
            from: OFFICE_EMAIL,
            to: OFFICE_EMAIL,
            subject: `פניית לקוח- ${message.subject}`,
            text: `מאת: ${message.email} (${message.name})\n${message.body}`
        };

        // Send the email
        transporter.sendMail(mailOptions, (error: any, info: { messageId: any; }) => {
            if (error) {
                throw new Error(error)
            }
            logger.info('Message sent: %s', info.messageId);
        });
        return res.status(200).send('ההודעה נשלחה בהצלחה');
    } catch (error: Error | any) {
        logger.error(`[POST] - ${new Date().toISOString()} - faild send message - Error: ${error}`);
        res.status(400).send(error!.message);
    }
});

//שליחת קבלה
router.post('/sendReception', async (req: Request, res: Response) => {
    try {
        // Create a transporter with your SMTP settings
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true, // upgrade later with STARTTLS
            auth: {
                user: 'tootit.office@gmail.com',
                pass: ',u,h,,u,h,,u,h,'
            }
        });

        // Setup email data
        let mailOptions = {
            from: 'tootit.office@gmail.com',
            to: 'tootit.office@gmail.com',
            subject: 'Test Email',
            text: 'This is a test email from Node.js'
        };

        // Send the email
        transporter.sendMail(mailOptions, (error: any, info: { messageId: any; }) => {
            if (error) {
                throw new Error(error)
            }
            logger.info('Message sent: %s', info.messageId);
        });
    } catch (error: Error | any) {
        logger.error(`[POST] - ${new Date().toISOString()} - faild send message - Error: ${error}`);
        res.status(400).send(error!.message);
    }
});





export { router };
