import express from 'express';
import cors from 'cors';
import "dotenv/config";
import { Request , Response } from 'express';
import mongoose from 'mongoose';
import myUserRoute from './routes/MyUserRoutes';
import myBacklinkRoute from './routes/MyBacklinkRoute';
import BacklinkRoute from './routes/BacklinkRoute';


mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string)
    .then(() => {
        console.log('Connected to MongoDB');
    });
    
const app = express();
app.use(cors());
app.use(express.json());


app.get('/health', (req: Request, res: Response) => {
    res.send({ message: 'health OK!' });
});

app.use("/api/my/user", myUserRoute);
app.use("/api/my/backlink", myBacklinkRoute);
app.use("/api/backlink",BacklinkRoute)

app.listen(7000, () => {
    console.log('Server is running on port 7000');
});