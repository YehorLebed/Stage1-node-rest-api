const express = require('express');
const path = require('path');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');

require('dotenv').config();

const { PORT } = process.env;

const app = express();

// Middlewares
app.use(cors());
app.use(express.json({ extended: true }));
app.use(require('./middleware/logMiddleware'));
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


app.use(express.static(path.resolve(__dirname, 'client')));
app.use('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'index.html'))
});

app.use(require('./controllers/errorController').get404);


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
});

