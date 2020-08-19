const express = require('express');
const swaggerUi = require('swagger-ui-express');

require('dotenv').config();

const { PORT } = process.env;

const app = express();

// Middlewares
app.use(express.json({ extended: true }));
app.use('/api', require('./middleware/authMiddleware').giveToken);
app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(require('./utils/swagger'))
);

// Routes
app.use(
    '/api/posts',
    [
        require('./middleware/authMiddleware').checkToken
    ],
    require('./routes/post.routes')
);

app.use(require('./controllers/errorController').get404);

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
});

