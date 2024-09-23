
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





















// const express = require('express');
// const app = express();
// const env = require('dotenv');
// const db = require("./config/database");
// const morgan = require('morgan');

// //configure dotenv
// env.config();


// //middlewares
// app.use(express.json());
// app.use(morgan('dev'));

// // router
// app.get('/', (req, res) => {
//     res.send("hello jee");

//     // const sql = 'SELECT * FROM events'; // Assuming you have an 'events' table

//     // db.query(sql, (err, results) => {
//     //   if (err) {
//     //     console.error('Error executing query:', err);
//     //     return res.status(500).send('Database query failed');
//     //   }
  
//     //   // Send the results back as a response
//     //   res.json(results);
//     // });
// });


// // port
// const PORT = process.env.PORT || 8081;

// db.query('SELECT 1').then(() => {
// // mysql
// console.log("my sql db connected")

// // listen
// app.listen(3000, () => {
//     console.log(`server started at port no. ${PORT}`);
// });
// }).catch((error) => {
//     console.log(error);
// })


