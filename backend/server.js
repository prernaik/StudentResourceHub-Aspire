    const express = require('express');
    const mongoose = require('mongoose');
   const bodyParser = require('body-parser');
   const swaggerJsDoc = require('swagger-jsdoc');
   const swaggerUi = require('swagger-ui-express');
    const authRoutes = require('./routes/auth');
    const resourceRoutes = require('./routes/resources');
    const userRoutes = require('./routes/users');
    const commentRoutes = require('./routes/comments');
   const swaggerOptions = require('./swagger');


   const app = express();
   const PORT = process.env.PORT || 5000;

   // CORS middleware
   app.use((req, res, next) => {
       res.header('Access-Control-Allow-Origin', '*');
       res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
       res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
       if (req.method === 'OPTIONS') {
           res.sendStatus(200);
       } else {
           next();
       }
   });

   // MongoDB connection using mongoose
    const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://sahilsahil40205:mrnXigCJ7zq66o1B@cluster0.cqk2jmq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(MONGO_URI)
    .then(() => console.log('MongoDB connected successfully'))
    .catch((err) => console.error('MongoDB connection error:', err));

   // Middleware
   app.use(bodyParser.json());

   // Health check endpoint
   app.get('/health', (req, res) => {
       res.status(200).json({ status: 'OK', message: 'Server is running' });
   });

   // Swagger documentation
   const swaggerDocs = swaggerJsDoc(swaggerOptions);
   app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

   // Routes
    app.use('/api/auth', authRoutes);
    app.use('/api/resources', resourceRoutes);
    app.use('/api/users', userRoutes);
    app.use('/api/comments', commentRoutes);

   // Error handling middleware
   app.use((err, req, res, next) => {
       console.error(err.stack);
       res.status(500).json({ error: 'Something went wrong!' });
   });

   // 404 handler
   app.use('*', (req, res) => {
       res.status(404).json({ error: 'Route not found' });
   });

   app.listen(PORT, () => {
       console.log(`Server is running on http://localhost:${PORT}`);
       console.log(`API documentation available at http://localhost:${PORT}/api-docs`);
   });
   
