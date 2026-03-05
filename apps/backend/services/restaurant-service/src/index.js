import dotenv from 'dotenv';
dotenv.config();

import app from './app.js';
import {connectDB} from './db/index.js';

const PORT = process.env.PORT || 4003;
connectDB().then(()=>{
    app.listen(PORT, '0.0.0.0', ()=>{
        console.log(`Restaurant servie running on port ${PORT}`);
    });
});
