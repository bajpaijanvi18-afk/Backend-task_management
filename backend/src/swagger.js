const swaggerJsDoc = require('swagger-jsdoc');

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Task Management API',
            version: '1.0.0',
            description:
                'Backend API with JWT Authentication and Role-Based Access',
        },

        servers: [
            {
                url: 'http://localhost:5000',
            },
        ],
    },

    apis: ['./src/routes/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = swaggerDocs;