const postService = require('../services/postService');

const postController = {
    create: async (req, res) => {
        const { title, content, categoryIds } = await postService.validateBody(req.body);
        const { authorization } = req.headers;
        await postService.create({ title, content, categoryIds }, authorization);

        res.status(201);
    },
    list: async (_req, res) => {
        const post = await postService.list();

        res.status(200).json(post);
    },
};

module.exports = postController;