import express from 'express';
import connect from './db/db.js';
import userRoutes from './routes/user.routes.js'
import teacherRoutes from './routes/teacher.routes.js'
import courseRoutes from './routes/course.routes.js'
import paymentRoutes from './routes/payment.routes.js'
import cookieParser from 'cookie-parser';
import cors from 'cors';

connect();

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/users', userRoutes);
app.use('/teachers', teacherRoutes);
app.use('/courses', courseRoutes);
app.use('/payments', paymentRoutes);
app.use(cookieParser());


app.get('/', (req, res) => {
    res.send('Hello World');
})

export default app;