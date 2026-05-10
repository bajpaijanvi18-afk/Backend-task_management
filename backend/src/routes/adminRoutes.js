const express = require('express');

const prisma = require('../config/db');

const authMiddleware = require(
    '../middleware/authMiddleware'
);

const adminMiddleware = require(
    '../middleware/adminMiddleware'
);

const router = express.Router();

router.get(
    '/users',
    authMiddleware,
    adminMiddleware,
    async (req, res) => {
        try {
            const users = await prisma.user.findMany({
                select: {
                    id: true,
                    name: true,
                    email: true,
                    role: true,
                },
            });

            res.status(200).json(users);
        } catch (error) {
            console.log(error);

            res.status(500).json({
                message: 'Server Error',
            });
        }
    }
);

module.exports = router;