const prisma = require('../config/db');

exports.createTask = async (req, res) => {
    try {
        const { title, description } = req.body;

        const task = await prisma.task.create({
            data: {
                title,
                description,
                userId: req.user.id,
            },
        });

        res.status(201).json(task);
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: 'Server Error',
        });
    }
};

exports.getTasks = async (req, res) => {
    try {
        const tasks = await prisma.task.findMany({
            where: {
                userId: req.user.id,
            },
        });

        res.status(200).json(tasks);
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: 'Server Error',
        });
    }
};

exports.updateTask = async (req, res) => {
    try {
        const { id } = req.params;

        const task = await prisma.task.update({
            where: {
                id: Number(id),
            },
            data: req.body,
        });

        res.status(200).json(task);
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: 'Server Error',
        });
    }
};

exports.deleteTask = async (req, res) => {
    try {
        const { id } = req.params;

        await prisma.task.delete({
            where: {
                id: Number(id),
            },
        });

        res.status(200).json({
            message: 'Task deleted',
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: 'Server Error',
        });
    }
};