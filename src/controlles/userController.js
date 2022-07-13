const userService = require('../services/userService');
const authService = require('../services/authService');

const userController = {
    list: async (_req, res) => {
        const users = await userService.list();
        res.status(200).json(users);
    },
    create: async (req, res) => {
        const { displayName, email, password, image } = userService.validateBody(req.body);

        await userService.create({ displayName, email, password, image });

        const token = await authService.login(email, password);

        res.status(201).json({ token });
    },
};

module.exports = userController;