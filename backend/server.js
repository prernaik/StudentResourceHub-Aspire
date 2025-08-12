   const express = require('express');
   const bodyParser = require('body-parser');
   const swaggerJsDoc = require('swagger-jsdoc');
   const swaggerUi = require('swagger-ui-express');
   const authRoutes = require('./routes/auth');
   const resourceRoutes = require('./routes/resources');
   const userRoutes = require('./routes/users');
   const swaggerOptions = require('./swagger');

   const app = express();
   const PORT = process.env.PORT || 5000;

   // Middleware
   app.use(bodyParser.json());

   // Swagger documentation
   const swaggerDocs = swaggerJsDoc(swaggerOptions);
   app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

   // Routes
   app.use('/api/auth', authRoutes);
   app.use('/api/resources', resourceRoutes);
   app.use('/api/users', userRoutes);

   app.listen(PORT, () => {
       console.log(`Server is running on http://localhost:${PORT}`);
   });
   