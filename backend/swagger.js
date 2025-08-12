   const swaggerOptions = {
       swaggerDefinition: {
           openapi: '3.0.0',
           info: {
               title: 'Aspire API',
               version: '1.0.0',
               description: 'API documentation for Aspire - Student Resource Hub',
           },
           servers: [
               {
                   url: 'http://localhost:5000',
               },
           ],
       },
       apis: ['./routes/*.js'], // Path to the API docs
   };

   module.exports = swaggerOptions;
   