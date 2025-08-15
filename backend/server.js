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

   // MongoDB connection using mongoose
    const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://sahilsahil40205:mrnXigCJ7zq66o1B@cluster0.cqk2jmq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(MONGO_URI)
    .then(() => console.log('MongoDB connected successfully'))
    .catch((err) => console.error('MongoDB connection error:', err));

   // Middleware
   app.use(bodyParser.json());

   // Swagger documentation
   const swaggerDocs = swaggerJsDoc(swaggerOptions);
   app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

   // Routes
    app.use('/api/auth', authRoutes);
    app.use('/api/resources', resourceRoutes);
    app.use('/api/users', userRoutes);
    app.use('/api/comments', commentRoutes);

   app.listen(PORT, () => {
       console.log(`Server is running on http://localhost:${PORT}`);
   });
   
