import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Backlink from '../models/backlink';

const createMyBacklink = async (req: Request, res: Response) => {
    try {
        const existingBacklink = await Backlink.findOne({ url: req.body.url });
        if (existingBacklink) {
            return res.status(400).send({ message: 'Backlink already exists' });
        }
    

    const backlink = new Backlink(req.body);
    backlink.lastUpdated = new Date();
    await backlink.save();
    res.status(201).send(backlink);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
}


export default {
    createMyBacklink
};



