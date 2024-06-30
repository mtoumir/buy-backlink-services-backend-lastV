import express from 'express';
import multer from 'multer';
import { validateMyBacklinkRequest } from '../middleware/validation';
import { jwtCheck, jwtParse } from '../middleware/auth';
import MyBacklinkController from '../controllers/MyBacklinkController';

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });   

router.post(
    "/",
    
    MyBacklinkController.createMyBacklink
);

export default router;

