
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const userRoutes = require('./routes/userRoutes');
const eventRoutes = require('./routes/eventRoutes');
const ticketRoutes = require('./routes/ticketRoutes');
const engagementRoutes = require('./routes/engagementRoutes');
const contactRoutes = require('./routes/contactRoutes');
const cors = require('cors');

const app = express();

dotenv.config();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true, 
}));

app.use(express.json());

app.use('/api/v1', userRoutes);
app.use('/api/v1', eventRoutes);
app.use('/api/v1', ticketRoutes);
app.use('/api/v1', engagementRoutes);
app.use('/api/v1', contactRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

connectDB();

app.get('/', (req, res) =>{
    res.send("<h4>Hello This is Your Default Route</h4>");
})






