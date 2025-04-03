import 'dotenv/config.js';
import http from 'http';
import app from './app.js';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';


const PORT = process.env.PORT || 4000;
const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});