const express = require('express');

require('dotenv').config();

const { PORT } = process.env;

const app = express();

// Middlewares
app.use(express.json({ extended: true }));
app.use(require('./middleware/authMiddleware').giveToken);

// Routes
app.use(
    '/api/posts',
    [
        require('./middleware/authMiddleware').giveToken
    ],
    require('./routes/post.routes')
);

app.use(require('./controllers/errorController').get404);

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

