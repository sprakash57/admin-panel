const swaggerJsDoc = require("swagger-jsdoc");

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.1',
        info: {
            title: "Contrivocial API",
            version: "1.0",
            description: "API protoype for social platform",
            contact: {
                name: 'Sunny Prakash',
                email: 'sunny.prakashgm@gmail.com',
                url: 'https://suprdev.netlify.com'
            }
        },
        host: 'localhost:5000',
        basePath: '/api',
    },
    apis: ['./routes/api/auth.js']
};

module.exports = swaggerJsDoc(swaggerOptions);
