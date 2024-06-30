import express from 'express';
import { param } from 'express-validator';
import backlinkController from '../controllers/BacklinkController';

const router = express.Router();

router.get("/search/:url",
    param("url").isString().trim().notEmpty().withMessage("URL is required"), 
    backlinkController.searchBacklink
)

export default router;