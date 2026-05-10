const express = require('express');
const cors = require('cors');

const swaggerUi = require('swagger-ui-express');

const swaggerDocs = require('./swagger');

const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();

app.use(cors());

app.use(express.json());

app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocs)
);

app.get('/', (req, res) => {
    res.json({
        message: 'API Running',
    });
});

app.use('/api/v1/auth', authRoutes);

app.use('/api/v1/tasks', taskRoutes);

app.use('/api/v1/admin', adminRoutes);

module.exports = app;