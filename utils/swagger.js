const swaggerJsDoc = require('swagger-jsdoc');

const { HOST } = process.env;

const options = {
    definition: {
        info: {
            title: 'Hello World',
            version: '1.0.0',
        },
        servers: [
            {
                url: `${HOST}/api`,
                description: "Development server"
            }
        ]
    },
    apis: [
        './routes/*.js'
    ]
};

module.exports = swaggerJsDoc(options);